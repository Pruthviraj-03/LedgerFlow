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
  const images = [leager1, leager2, leager3, leager4, leager5, leager6];

  const initialLedgerApi = [
    {
      id: "1",
      image: leager1,
      name: "Personal Budget",
      description:
        "A comprehensive ledger designed to help you track and manage your personal finances. This includes recording your income, categorizing your expenses, and setting monthly or yearly budgets. By maintaining this ledger, you can gain insights into your spending habits, make informed decisions about saving and investing, and achieve better control over your financial health.",
      createdAt: "1st September, 2024",
    },
  ];

  const navigate = useNavigate();
  const [ledgers, setLedgers] = useState(initialLedgerApi);
  const [search, setSearch] = useState("");
  const [filteredLedgers, setFilteredLedgers] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState("Recommended");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newLedger, setNewLedger] = useState({ name: "", description: "" });

  useEffect(() => {
    setFilteredLedgers(ledgers);
  }, [ledgers]);

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

  const handleNewLedgerSubmit = () => {
    const newLedgerData = {
      id: Date.now().toString(),
      image: images[Math.floor(Math.random() * images.length)],
      name: newLedger.name,
      description: newLedger.description,
      createdAt: new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setLedgers([...ledgers, newLedgerData]);
    setShowForm(false);
    setNewLedger({ name: "", description: "" });
  };

  const handleCancel = () => {
    setShowForm(false);
    setNewLedger({ name: "", description: "" });
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
          <div
            className="flex items-center justify-center max-w-xs mx-auto w-80 overflow-hidden bg-white rounded-lg shadow-xl mobile:mb-5 cursor-pointer"
            onClick={() => setShowForm(!showForm)}
          >
            <span className="border-2 border-black bg-white text-black text-6xl rounded-full opacity-70 mobile:right-4 p-4">
              <FaPlus />
            </span>
          </div>

          {showForm && (
            <div className="flex flex-col gap-4 w-full max-w-xs mx-auto p-4 bg-white rounded-lg shadow-lg">
              <input
                type="text"
                placeholder="Ledger Name"
                value={newLedger.name}
                onChange={(e) =>
                  setNewLedger({ ...newLedger, name: e.target.value })
                }
                className="p-2 border border-gray-400 rounded-md"
              />
              <textarea
                placeholder="Ledger Description"
                value={newLedger.description}
                onChange={(e) =>
                  setNewLedger({
                    ...newLedger,
                    description: e.target.value,
                  })
                }
                className="p-2 border border-gray-400 rounded-md"
              />
              <button
                onClick={handleNewLedgerSubmit}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Add Ledger
              </button>
              <button
                onClick={handleCancel}
                className="bg-red-500 text-white p-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          )}

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
                <div className="text-lg font-bold py-2 mt-3 text-gray-800">
                  {curElem.createdAt}
                </div>
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
