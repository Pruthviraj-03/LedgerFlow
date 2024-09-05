import React, { useState, useMemo } from "react";
import { Header } from "../components/index";
import Dropdown from "../components/DropDown";
import { FaPlus } from "react-icons/fa";

const Transaction = () => {
  const transactionApi = [
    {
      id: "1",
      name: "Johnathan Catherine Doe",
      amount: "10,000",
      date: "10/10/2024",
      type: "Given",
    },
    {
      id: "2",
      name: "Catherine Michael Smith",
      amount: "12,500",
      date: "15/10/2024",
      type: "Taken",
    },
    {
      id: "3",
      name: "Michael Elizabeth Johnson",
      amount: "8,750",
      date: "20/10/2024",
      type: "Given",
    },
    {
      id: "4",
      name: "Elizabeth Alexander Brown",
      amount: "15,000",
      date: "25/10/2024",
      type: "Taken",
    },
    {
      id: "5",
      name: "Alexander Victoria Williams",
      amount: "5,500",
      date: "30/10/2024",
      type: "Given",
    },
    {
      id: "6",
      name: "Victoria Christopher Jones",
      amount: "20,000",
      date: "02/11/2024",
      type: "Taken",
    },
    {
      id: "7",
      name: "Christopher Olivia Davis",
      amount: "7,250",
      date: "07/11/2024",
      type: "Given",
    },
    {
      id: "8",
      name: "Olivia Benjamin Garcia",
      amount: "18,000",
      date: "12/11/2024",
      type: "Taken",
    },
    {
      id: "9",
      name: "Benjamin Sophia Miller",
      amount: "9,300",
      date: "17/11/2024",
      type: "Given",
    },
    {
      id: "10",
      name: "Sophia Johnathan Wilson",
      amount: "14,600",
      date: "22/11/2024",
      type: "Taken",
    },
  ];

  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactionApi];

    if (selectedType) {
      filtered = filtered.filter(
        (transaction) => transaction.type === selectedType
      );
    }

    if (selectedAmount) {
      filtered = filtered.sort((a, b) => {
        const amountA = Number(a.amount.replace(/,/g, ""));
        const amountB = Number(b.amount.replace(/,/g, ""));

        if (selectedAmount === "H to L") {
          return amountB - amountA;
        } else if (selectedAmount === "L to H") {
          return amountA - amountB;
        }
        return 0;
      });
    }

    return filtered;
  }, [selectedAmount, selectedType, transactionApi]);

  return (
    <div>
      <Header />
      <div className="w-full px-36 pt-10">
        <span className="font-nunito text-2xl font-bold text-gray-800">
          Personal Budget
        </span>
        <p className="font-nunito text-xl text-gray-800 mt-5">
          A comprehensive ledger designed to help you track and manage your
          personal finances. This includes recording your income, categorizing
          your expenses, and setting monthly or yearly budgets. By maintaining
          this ledger, you can gain insights into your spending habits, make
          informed decisions about saving and investing, and achieve better
          control over your financial health.
        </p>
      </div>
      <div className="flex px-36 my-12 justify-between">
        <span className="font-nunito text-4xl font-bold text-gray-800">
          Transactions
        </span>

        <div className="flex flex-row gap-5">
          <Dropdown
            title={"Amount"}
            options={["H to L", "L to H"]}
            selectedValue={selectedAmount}
            setSelectedValue={setSelectedAmount}
          />

          <Dropdown
            title={"Type"}
            options={["Given", "Taken"]}
            selectedValue={selectedType}
            setSelectedValue={setSelectedType}
          />
        </div>
      </div>
      <div className="px-60 my-10">
        <div className="flex items-center justify-between w-full border border-black p-5 rounded-t-xl">
          <div className="flex justify-center items-center h-auto w-5p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              ID
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-50p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Full Name
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Amount
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800">
              Date
            </span>
          </div>
          <div className="flex justify-center items-center h-auto w-15p">
            <span className="font-nunito text-xl font-bold text-gray-800 pr-5">
              Type
            </span>
          </div>
        </div>
        {filteredTransactions.map((data, index) => (
          <div
            key={index}
            className="flex items-center justify-between w-full border border-black p-5 border-t-0"
          >
            <div className="flex justify-center items-center h-auto w-5p">
              <span className="font-nunito text-lg text-gray-800">
                {data.id}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-50p">
              <span className="font-nunito text-lg text-gray-800">
                {data.name}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <span className="font-nunito text-lg text-gray-800">
                {data.amount}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <span className="font-nunito text-lg text-gray-800">
                {data.date}
              </span>
            </div>
            <div className="flex justify-center items-center h-auto w-15p">
              <span className="font-nunito text-lg text-gray-800 pr-5">
                {data.type}
              </span>
            </div>
          </div>
        ))}
        <div className="flex flex-row items-center justify-center w-full border border-black p-5 border-t-0 cursor-pointer">
          <span className="font-nunito text-xl font-bold text-gray-800">
            Add New Transaction Here...
          </span>
          <span className="border-2 border-black bg-white text-black text-xl rounded-full opacity-70 p-1 ml-5">
            <FaPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
