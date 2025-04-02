import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import Results from "./pages/Results";
import { connectWallet } from "./api/web3";
import { motion } from "framer-motion";

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);

  const handleConnect = async () => {
    const address = await connectWallet();
    setWalletAddress(address);
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <motion.nav 
          className="bg-blue-500 p-4 text-white flex justify-between items-center shadow-lg"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/" className="font-bold">Vote</Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }}>
              <Link to="/results">Results</Link>
            </motion.div>
          </div>
          <motion.button
            onClick={handleConnect}
            className="bg-gray-900 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {walletAddress ? `Connected: ${walletAddress.slice(0, 6)}...` : "Connect Wallet"}
          </motion.button>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;
