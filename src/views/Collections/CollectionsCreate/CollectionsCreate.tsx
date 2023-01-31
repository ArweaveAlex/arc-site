import React from "react";

import { OwnerArtifacts } from "global/Owner/OwnerArtifacts";

import { useQuery } from "hooks/useQuery";

import { Button } from "components/atoms/Button";
import { FormField } from "components/atoms/FormField";
import { TextArea } from "components/atoms/TextArea";

import { getArtifactsByUser } from "gql/artifacts";
import { REDUX_TABLES } from "helpers/redux";
import { LANGUAGE } from "helpers/language";
import { CollectionStateType, CursorEnum } from "helpers/types";
import { createCollection } from "helpers/collections";
import * as S from "./styles";

export default function CollectionsCreate() {
	const query = useQuery();

	const [title, setTitle] = React.useState<string>("");
	const [description, setDescription] = React.useState<string>("");
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	async function handleSubmit() {
		console.log({
			title: title,
			description: description,
			ids: selectedIds,
		});

		let collection: CollectionStateType = {
			title: "test",
			description: "test desc",
			ids: ["jNS-i6ZWL0k1h6CwkWDBe34FPgCYUW3igWCD4zpUDH8"],
		};

		let collectionContractId = await createCollection(
			collection,
			"crypto"
		);

		console.log(collectionContractId);
	}

	function handleIdUpdate(id: string) {
		let idList = [];
		for (let i = 0; i < selectedIds.length; i++) {
			idList.push(selectedIds[i]);
		}
		const index = idList.indexOf(id);
		if (index > -1) {
			idList.splice(index, 1);
		} else {
			idList.push(id);
		}
		setSelectedIds(idList);
	}

	return (
		<S.Wrapper>
			<S.HeaderWrapper>
				<S.HeaderContent>
					<S.HeaderContentFixed>
						<S.Header1Wrapper>
							<S.Header1>{LANGUAGE.createCollection}</S.Header1>
						</S.Header1Wrapper>
					</S.HeaderContentFixed>
				</S.HeaderContent>
			</S.HeaderWrapper>
			<S.ContentWrapper>
				<S.ArtifactsWrapper>
					<OwnerArtifacts
						owner={query.get("owner")}
						fetch={getArtifactsByUser}
						reduxCursor={REDUX_TABLES.accountAll}
						showCollections={true}
						showPoolIds={true}
						showSearch={false}
						selectCallback={(id: string) => handleIdUpdate(id)}
						selectedCallbackIds={selectedIds}
						cursorObject={{
							key: CursorEnum.Search,
							value: REDUX_TABLES.accountAll,
						}}
					/>
				</S.ArtifactsWrapper>
				<S.FormWrapper>
					<S.FormContainer>
						<S.FormFixedContainer>
							<S.FormHeader>
								<h2>{LANGUAGE.basicInformation}</h2>
							</S.FormHeader>
							<S.Form>
								<FormField
									label={LANGUAGE.title}
									value={title}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
									invalid={{ status: false, message: null }}
									disabled={false}
									sm
								/>
								<TextArea
									label={LANGUAGE.description}
									value={description}
									onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
									invalid={{ status: false, message: null }}
									disabled={false}
								/>
								<S.SubmitContainer>
									<Button type={"alt1"} label={LANGUAGE.submit} handlePress={() => handleSubmit()} formSubmit noMinWidth />
								</S.SubmitContainer>
							</S.Form>
						</S.FormFixedContainer>
					</S.FormContainer>
				</S.FormWrapper>
			</S.ContentWrapper>
		</S.Wrapper>
	);
}
