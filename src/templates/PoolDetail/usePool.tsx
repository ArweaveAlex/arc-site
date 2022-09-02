import Arweave from "arweave";
import { SmartWeaveNodeFactory } from "redstone-smartweave";
import { useEffect, useState } from "react";
import getURL from "@/utils/GetUrl";
import toast from "react-hot-toast";
import POOL_EXTRA_DATA from "@/utils/PoolExtraData";
import useSWR from "swr";
import { ContractDataProps } from "./PoolDetail";

export const usePool = (id: string) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [balance, setBalance] = useState<null | number>(null);
  const [loading, setLoading] = useState<boolean>(false)

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data: refreshedPoolData } = useSWR(`/api/pool/${id}`, fetcher, {
    refreshInterval: 15000,
  });

  const CURRENT_POOL_EXTRA_DATA = POOL_EXTRA_DATA.find(
    (pool) => pool.contract.id === id
  );

  if (!CURRENT_POOL_EXTRA_DATA) {
    throw new Error(`Pool extra data with id ${id} not found`);
  }

  const arweave = Arweave.init({
    host: "arweave.net",
    port: 443,
    protocol: "https",
    timeout: 40000,
    logging: false,
  });

  const handleModal = async () => {
    try {
      const currentWallet = await window.arweaveWallet.getActiveAddress();

      if (!currentWallet) {
        toast.error("Please connect your Arweave wallet.", {
          position: "top-right",
          duration: 8000,
          style: {
            background: "red",
            color: "white",
            borderRadius: "0.5rem",
          },
        });
        await handleWallet();
      }

      if (!balance) {
        toast.loading("Fetching wallet information...", {
          position: "top-right",
          duration: 3000,
        });

        await fetchUserBalance();

        toast.dismiss();

        toast.success("Wallet information loaded successfully.", {
          position: "top-right",
          duration: 3000,
          style: {
            background: "linear-gradient(to right, #F9C04A, #F6A646)",
            color: "white",
          },
        });
      }

      setModalOpen((prev) => !prev);
    } catch (error) {
      toast.error(
        "Something wen't wrong while connecting to your wallet, refresh the page or try to verify your browser extension.",
        {
          position: "top-right",
          duration: 8000,
          style: {
            background: "red",
            color: "white",
            borderRadius: "0.5rem",
          },
        }
      );
    }
  };

  const fetchUserBalance = async () => {
    const wallet = await window.arweaveWallet.getActiveAddress();

    const raw = await fetch(`${getURL()}/api/balance/${wallet}`);

    const json = await raw.json();

    setBalance(json.balance);
  };

  const contributeToPool = async (poolId, amount) => {
    if (!balance || amount > balance) {
      toast.error("You don't have enough AR to contribute to this pool.", {
        position: "top-right",
        duration: 8000,
        style: {
          background: "red",
          color: "white",
          borderRadius: "0.5rem",
        },
      });
      return;
    }

    toast.loading("Submitting contribution...", {
      position: "top-right",
      style: {
        background: "linear-gradient(to right, #F9C04A, #F6A646)",
        color: "white",
      },
    });

    setLoading(true)

    try {
      const smartweave = SmartWeaveNodeFactory.memCached(arweave);

      const { data: contractData }: { data: ContractDataProps; } = await arweave.api.get(`/${poolId}`);

      if (!contractData.owner) {
        throw new Error(
          "Failed to fetch contract owner. Please, try again in a few minutes."
        );
      }

      const token = smartweave
        .contract(poolId)
        .connect("use_wallet")
        .setEvaluationOptions({
          waitForConfirmation: false,
        });

      const result = await token.writeInteraction<any>(
        {
          function: "contribute",
        },
        [],
        {
          target: contractData.owner,
          // .000001 AR
          winstonQty: arweave.ar.arToWinston(amount),
        }
      );

      if (!result) {
        throw new Error("Failed to contribute to pool. Please, try again.");
      }

      toast.dismiss();

      toast.success("Thanks for your contribution.", {
        position: "top-right",
        duration: 5000,
        style: {
          background: "linear-gradient(to right, #F9C04A, #F6A646)",
          color: "white",
        },
      });

      setLoading(false)

      setModalOpen(false);
    } catch (error) {
      toast.dismiss();

      toast.error((error as any).message, {
        position: "top-right",
        duration: 8000,
        style: {
          background: "red",
          color: "white",
          borderRadius: "0.5rem",
        },
      });

      setLoading(false)

    }
  };

  const handleWallet = async () => {
    await window.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "ACCESS_ALL_ADDRESSES",
      "SIGN_TRANSACTION",
      "ACCESS_PUBLIC_KEY",
    ]);

    fetchUserBalance();
  };

  useEffect(() => {
    // add event listener
    window.addEventListener("arweaveWalletLoaded", handleWallet);

    return () => {
      // remove event listener
      window.removeEventListener("arweaveWalletLoaded", handleWallet);
    };
  }, []);

  // handle background modal click
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  // handle form submit
  const handleSubmit = (poolData) => (e: React.FormEvent) => {
    e.preventDefault();

    setModalOpen(false);

    const amount = (e.target as any).amount.value;

    contributeToPool(poolData.id, amount);
  };

  return {
    arweave,
    balance,
    CURRENT_POOL_EXTRA_DATA,
    loading,
    modalOpen,
    handleModal,
    handleSubmit,
    handleBackgroundClick,
    refreshedPoolData,
  };
};
