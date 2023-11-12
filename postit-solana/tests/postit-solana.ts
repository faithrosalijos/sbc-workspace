import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { PostitSolana } from "../target/types/postit_solana";
import { assert } from "chai";

describe("postit-solana", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const provider = anchor.getProvider();
  const keyPair = anchor.web3.Keypair.generate();

  const program = anchor.workspace.PostitSolana as Program<PostitSolana>;

  it("Is initialized!", async () => {
    const title = "This is a Title";
    const content = "This is a content.";
    await program.methods
      .initialize(title, content)
      .accounts({
        baseAccount: keyPair.publicKey,
        signer: provider.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .signers([keyPair])
      .rpc();

    const post = await program.account.post.fetch(keyPair.publicKey);
    assert.ok(post.title === title && post.content === content);
    console.log("Post inside my program: ", post);
  });
});
