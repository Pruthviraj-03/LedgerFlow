import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { Header, ScrollToTop } from "../components/index";
import leager1 from "../assets/images/leager1.jpg";
import leager2 from "../assets/images/leager2.jpg";
import leager3 from "../assets/images/leager3.jpg";
import leager4 from "../assets/images/leager4.jpg";
import leager5 from "../assets/images/leager5.jpg";
import leager6 from "../assets/images/leager6.jpg";
import { useNavigate } from "react-router-dom";

const Ledgers = () => {
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
    {
      id: "5",
      image: leager5,
      name: "Emergency Savings",
      description:
        "A crucial ledger for building and maintaining an emergency fund. This ledger assists in tracking your savings contributions, setting targets for your emergency fund, and ensuring that you have sufficient reserves for unexpected expenses or financial emergencies.",
      createdAt: "25th May, 2024",
    },
    {
      id: "6",
      image: leager6,
      name: "Home Renovation",
      description:
        "A dedicated ledger for managing and tracking expenses related to home renovation projects. This ledger helps you budget for renovation costs, record expenditures, and ensure that you stay within your planned budget while achieving your home improvement goals.",
      createdAt: "12th April, 2024",
    },
    {
      id: "7",
      image: leager1,
      name: "Educational Expenses",
      description:
        "An important ledger for tracking educational expenses, whether for tuition, books, or other academic costs. This ledger helps you manage and record educational spending, set savings goals, and keep track of your budget throughout your educational journey.",
      createdAt: "30th March, 2024",
    },
  ];

  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredLedgers, setFilteredLedgers] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Recommended");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setLedgers(legerApi);
  }, []);

  useEffect(() => {
    let results = ledgers.filter((ledger) =>
      ledger.name.toLowerCase().includes(search.toLowerCase())
    );

    switch (selectedSortOption) {
      case "Name Ascending (A-Z)":
        results = results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Name Descending (Z-A)":
        results = results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Recommended":
      default:
        break;
    }

    setFilteredLedgers(results);
  }, [search, selectedSortOption, ledgers]);

  const titleTrim = (content, maxLength = 30) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const descTrim = (content, maxLength = 120) => {
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const handlego = () => {
    navigate("/transactions");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center w-full h-auto bg-gray-100">
        <div className="flex flex-row w-4/5 h-auto justify-center items-center mt-10 laptop:w-5/6 tablet:w-full mobile:w-screen mobile:flex-col mobile:mt-8">
          <div className="flex w-3/4 gap-1 mr-8 tablet:w-4/6 mobile:w-11/12 mobile:h-10">
            <FiSearch className="text-3xl m-auto relative left-12 text-gray-400 mobile:text-2xl mobile:left-10" />
            <input
              type="text"
              placeholder="Search Your Ledger..."
              onChange={(e) => setSearch(e.target.value)}
              className="w-full py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-400 rounded-md focus:border-gray-600 focus:outline-none"
            />
          </div>

          <div className="relative flex items-center justify-center flex-row bg-white w-1/5 h-14 rounded-md cursor-pointer border border-gray-400 mr-5 laptop:w-4/12 tablet:w-5/12 mobile:mt-4 mobile:w-10/12 mobile:mr-2 mobile:h-10">
            <span className="font-nunito text-md text-gray-900 mr-2">
              Sort by:
            </span>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-md font-bold text-gray-800 border-none cursor-pointer py-3 px-4"
            >
              {selectedSortOption}
            </button>
            {showDropdown && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white shadow-lg dropdown-content">
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Recommended")}
                >
                  Recommended
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Name Ascending (A-Z)")}
                >
                  Name Ascending (A-Z)
                </h1>
                <h1
                  className="text-sm text-gray-800 py-3 px-4 no-underline block hover:bg-gray-200 cursor-pointer"
                  onClick={() => setSelectedSortOption("Name Descending (Z-A)")}
                >
                  Name Descending (Z-A)
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto w-4/5 flex flex-wrap gap-11 py-10 laptop:w-11/12 tablet:w-11/12 tablet:mt-96 tablet:pt-30 mobile:py-0">
          <div className="flex items-center justify-center max-w-xs mx-auto w-80 overflow-hidden bg-white rounded-lg shadow-xl mobile:mb-5 cursor-pointer">
            <span className="border-2 border-black bg-white text-black text-6xl rounded-full opacity-70 mobile:right-4 p-4">
              <FaPlus />
            </span>
          </div>
          {filteredLedgers.map((curElem) => (
            <div
              key={curElem.id}
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
      </div>
      <ScrollToTop />
    </div>
  );
};

export default Ledgers;
