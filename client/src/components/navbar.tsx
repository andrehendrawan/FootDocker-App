"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRectangleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { handleLogout } from "@/actions/user";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Navbar() {
  let logoutButton = null;
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const authorizationToken = Cookies.get("Authorization");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    const navToggle = document.getElementsByClassName("toggle");
    for (let i = 0; i < navToggle.length; i++) {
      (navToggle.item(i) as HTMLElement).classList.toggle("hidden");
    }
  };

  const logoutHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Log out",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Logged out!",
          text: "Successfully logged out!",
          icon: "success",
        });
        handleLogout();
      }
    });
  };

  return (
    <nav className={`flex flex-wrap items-center justify-between p-3 bg-black shadow-md ${isScrolled ? "fixed top-0 w-full bg-black z-50" : ""}`}>
      <img src="https://i.ibb.co/6NzzxX8/navbar-Logo.png" className="mx-2" alt="ACME" width="150" />
      <div className="flex md:hidden">
        <button id="hamburger" onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff", width: "20", height: "20" }} className="toggle block" />
          <FontAwesomeIcon icon={faRectangleXmark} style={{ color: "#ffffff", width: "20", height: "20" }} className="toggle hidden" />
        </button>
      </div>
      <div className={`toggle hidden w-full md:w-auto md:flex text-right text-bold mt-5 md:mt-0 border-t-2 border-white md:border-none`}>
        <Link href="/" className="block md:inline-block text-white hover:text-white px-3 py-3 border-b-2 border-white md:border-none">
          <span className={pathname === "/" ? "text-red-600" : "hover:border-b-2 hover:border-white hover:transition duration-100 ease-out"}>Home</span>
        </Link>
        <Link href="/about" className="block md:inline-block text-white hover:text-white px-3 py-3 border-b-2 border-white md:border-none">
          <span className={pathname === "/about" ? "text-red-600" : "hover:border-b-2 hover:border-white hover:transition duration-100 ease-out"}>About Us</span>
        </Link>
        <Link href="/products" className="block md:inline-block text-white hover:text-white px-3 py-3 border-b-2 border-white md:border-none">
          <span className={pathname === "/products" ? "text-red-600" : "hover:border-b-2 hover:border-white hover:transition duration-100 ease-out"}>Products</span>
        </Link>
        <Link href="/wishlist" className="block md:inline-block text-white hover:text-white px-3 py-3 border-b-2 border-white md:border-none">
          <span className="hover:border-b-2 hover:border-white hover:transition duration-100 ease-out">Wishlist</span>
        </Link>
      </div>

      {authorizationToken ? (
        <>
          <button onClick={logoutHandler} className="toggle hidden md:flex w-full md:w-auto px-4 py-2 mt-1 text-right border border-white text-white hover:text-black hover:bg-white md:rounded">
            Log out
          </button>
        </>
      ) : (
        logoutButton
      )}
    </nav>
  );
}
