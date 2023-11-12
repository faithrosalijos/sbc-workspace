import PostCard from "../components/PostCard";
import NewPost from "../components/NewPost";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, web3 } from "@project-serum/anchor";
import { Connection, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { idl } from "../idl/postit_solana";
import { useEffect, useState } from "react";

const { SystemProgram, Keypair } = web3;
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed",
};
const programID = new PublicKey(idl.metadata.address);

const Home = () => {
  const { setVisible } = useWalletModal();
  const wallet = useWallet();
  const [posts, setPosts] = useState([]);

  const connect = () => {
    setVisible(true);
  };

  const parseWalletKey = (string) => {
    return `${string.slice(0, 5)}......${string.slice(-5)}`;
  };

  const getProvider = async () => {
    const network = clusterApiUrl("devnet");
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new AnchorProvider(
      connection,
      wallet,
      opts.preflightCommitment
    );
    return provider;
  };

  const createPost = async (title, content) => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);

    try {
      await program.rpc.initialize(title, content, {
        accounts: {
          customer: baseAccount.publicKey,
          signer: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        },
        signers: [baseAccount],
      });

      fetchPosts();
    } catch (err) {
      console.log("Transaction error: ", err);
    }
  };

  const fetchPosts = async () => {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);

    try {
      const posts = await program.account.post.all();
      setPosts(posts);
      console.log(posts);
    } catch (err) {
      console.log("Fetchin error: ", err);
    }
  };

  useEffect(() => {
    if (wallet.connected) fetchPosts();
  }, [wallet.connected]);

  return (
    <div className="bg-slate-900 h-screen overflow-auto py-12">
      {wallet.connected ? (
        <div className="w-4/5 m-auto flex flex-col gap-10">
          <header className="flex justify-between items-center">
            <h1 className="text-white font-bold text-xl">PostIt</h1>
            <button
              type="submit"
              className="text-white font-medium rounded-lg text-xs w-full sm:w-auto px-3 py-2 text-center bg-blue-600 hover:bg-blue-700"
              onClick={() => {}}
            >
              {parseWalletKey(wallet.publicKey.toString())}
            </button>
            <div
              id="dropdown"
              className="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <div className="block px-4 py-2 hover:bg-gray-600 hover:text-white">
                    Logout
                  </div>
                </li>
              </ul>
            </div>
          </header>
          <main className="flex gap-8">
            <div className="basis-1/4">
              <NewPost handleNewPost={createPost} />
            </div>
            <div className="basis-3/4 flex flex-col gap-2">
              {posts.map((post, index) => (
                <PostCard
                  key={index}
                  title={post.account.title}
                  content={post.account.content}
                  user={post.publicKey.toString()}
                />
              ))}
            </div>
          </main>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full gap-4 h-full justify-center">
          <h2 className="text-white font-bold text-2xl">No Wallet Connected</h2>
          <button
            type="submit"
            className="text-white font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700"
            onClick={connect}
          >
            Connect
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
