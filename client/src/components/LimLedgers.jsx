import React from "react";
import { Button } from "./index";
import leager1 from "../assets/images/leager1.jpg";
import leager2 from "../assets/images/leager2.jpg";
import leager3 from "../assets/images/leager3.jpg";
import leager4 from "../assets/images/leager4.jpg";
import { useNavigate } from "react-router-dom";

const LimLedgers = () => {
  const legerApi = [
    {
      id: "1",
      image: leager1,
      name: "Personal Budget",
      description:
        "A comprehensive ledger designed to help you track and manage your personal finances. This includes recording your income, categorizing your expenses, and setting monthly or yearly budgets. By maintaining this ledger, you can gain insights into your spending habits, make informed decisions about saving and investing, and achieve better control over your financial health.",
      createdAt: "1st September, 2024",
    },
    {
      id: "2",
      image: leager2,
      name: "Business Expenses",
      description:
        "An organized ledger specifically for managing and recording all expenses related to your business operations. This ledger helps in tracking operational costs, categorizing different types of expenses, and maintaining accurate records for financial analysis and tax reporting. By using this ledger, you can monitor business expenses efficiently and ensure compliance with financial regulations.",
      createdAt: "15th August, 2024",
    },
    {
      id: "3",
      image: leager3,
      name: "Savings Goals",
      description:
        "A targeted ledger focused on tracking progress towards various savings goals. Whether you’re saving for a vacation, a new gadget, or an emergency fund, this ledger helps you set specific savings targets, track your contributions over time, and visualize your progress. This ledger is essential for staying motivated and organized as you work towards achieving your financial goals.",
      createdAt: "20th July, 2024",
    },
    {
      id: "4",
      image: leager4,
      name: "Vacation Fund",
      description:
        "A specialized ledger for planning and tracking savings towards your next vacation. This ledger helps you set a budget for your trip, record contributions towards your vacation fund, and monitor your progress to ensure you have enough saved up by your departure date.",
      createdAt: "10th June, 2024",
    },
  ];

  const navigate = useNavigate();

  const handlego = () => {
    navigate("/transactions");
  };

  const titleTrim = (content, maxLength = 30) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  const descTrim = (content, maxLength = 120) => {
    if (content.length > maxLength) {
      return content.slice(0, maxLength) + "...";
    }
    return content;
  };

  return (
    <div className="py-20 w-full bg-gray-100 mobile:py-8 mobile:mt-110">
      <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10 laptop:w-11/12 tablet:w-11/12 tablet:mt-96 tablet:pt-30 mobile:py-0">
        {legerApi.slice(0, 4).map((curElem, key) => (
          <div
            key={key}
            onClick={handlego}
            className="max-w-xs mx-auto overflow-hidden bg-white rounded-lg shadow-xl mobile:mb-5 cursor-pointer"
          >
            <img
              className="object-cover w-full h-48 mt-1"
              src={curElem.image}
              alt={`${curElem.name} cover`}
            />

            <div className="px-4 py-2 h-72 mt-3">
              <h1 className="text-3xl font-bold text-gray-800 uppercase">
                {titleTrim(curElem.name)}
              </h1>
              <p className="mt-3 text-sm text-gray-600">
                {descTrim(curElem.description)}
              </p>
              <h1 className="text-lg font-bold py-2 mt-3 text-gray-800">
                {curElem.createdAt}
              </h1>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center h-auto w-full">
        <Button text="View all Ledgers ..." to="/ledgers" />
      </div>
    </div>
  );
};

export default LimLedgers;
