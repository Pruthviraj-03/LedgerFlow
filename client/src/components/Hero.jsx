import React from "react";
import bookHero from "../assets/images/bookHero.jpg";
import Button from "./Button";

const Hero = () => {
  return (
    <>
      <div
        className="flex tablet:flex-col tablet:h-auto mobile:flex-col mobile:h-auto"
        style={{ height: "80vh" }}
      >
        <div className="bg-gray-900 w-full flex justify-center items-center">
          <img
            src={bookHero}
            alt="Ledgers"
            style={{ height: "70%" }}
            className="rounded-lg rotateImg"
          />
        </div>

        <div className="bg-gray-400 tablet:py-32 mobile:py-10 w-full flex justify-start items-center">
          <div>
            <p className="font-nunito overflow-hidden font-bold text-4xl mx-4 line-to-animate uppercase animation-typewriter laptop:text-3xl mobile:text-17">
              Manage Your Finance Effortlessly
            </p>
            <p className="font-semibold text-xl ml-4 mr-40 my-3 mobile:hidden">
              “Track your financial journey with precision. The more you
              organize, the clearer your financial picture becomes. Simplify
              your ledger management and take control of your transactions.”
            </p>
            <p className="font-semibold text-xl mx-4 my-2 mobile:text-base mobile:my-0">
              Discover and manage your ledgers and transactions seamlessly with
              our intuitive platform.
            </p>
            <div className="my-5 mx-7 mobile:mx-4">
              <Button text="Create Now" to="/Ledgers" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
