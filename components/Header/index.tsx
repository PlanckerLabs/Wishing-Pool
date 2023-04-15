"use client";
import * as React from 'react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import { useConnect, useAccount, useDisconnect, useSignMessage } from 'wagmi'
import { verifyMessage } from 'ethers/lib/utils'

const Header = () => {

  const { address, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()
  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  const recoveredAddress = React.useRef<string>()
  const { data, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, data)
      recoveredAddress.current = address
    },
  })
  return (
    <>
      <header
        className={`header top-0 left-0 z-40 flex w-full items-center bg-transparent ${sticky
          ? "!fixed !z-[9999] !bg-white !bg-opacity-80 shadow-sticky backdrop-blur-sm !transition dark:!bg-primary dark:!bg-opacity-20"
          : "absolute"
          }`}
      >
        <div className="container">
          <div className="relative flex items-center justify-between -mx-4">
            <div className="max-w-full px-4 w-60 xl:mr-12">
              <Link
                href="/"
                className={`header-logo block w-full ${sticky ? "py-5 lg:py-2" : "py-8"
                  } `}
              >
                <h1>Wishing Pool</h1>
              </Link>
            </div>
            <div className="flex items-center justify-end w-full px-4">
              <h1 className="pr-5">Wishing Power</h1>
              <div className="flex items-center justify-end pr-16 lg:pr-0">
                {
                  connectors.map((connector) => (
                    <button className="flex items-center justify-center w-full py-4 mr-2 text-base font-medium text-white transition duration-300 ease-in-out rounded-md bg-primary px-9 hover:bg-opacity-80 hover:shadow-signUp"
                      onClick={() => connect({ connector })}>
                      {!isConnected && 'Connect'}
                      {address}
                    </button>
                  ))
                }

                {
                  isConnected &&
                  <button
                    className="flex items-center justify-center w-full py-4 text-base font-medium text-white transition duration-300 ease-in-out rounded-md bg-primary px-9 hover:bg-opacity-80 hover:shadow-signUp"
                    onClick={() => disconnect}>Disconnect</button>
                }
                <div>
                  <ThemeToggler />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header >
    </>
  );
};

export default Header;
