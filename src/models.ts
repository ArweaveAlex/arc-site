import mongoose from "mongoose";

/* PoolSchema will correspond to a Status in your MongoDB database. */
const PoolSchema = new mongoose.Schema(
    {
        id: String,
        state: Object,
        artefacts: Number,
        ts: Date
    }
);

export default mongoose.models.Pool ||
    mongoose.model("Pool", PoolSchema);
