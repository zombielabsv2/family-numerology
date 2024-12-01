"use client";
import React, { useState } from "react";
import { Calculator, Plus, Minus } from "lucide-react";

interface FamilyMember {
  name: string;
  day: string;
  month: string;
  year: string;
}

interface MemberNumber {
  name: string;
  number: number;
  isLucky: boolean;
}

interface YearResult {
  year: number;
  yearNumber: number;
  luckyNumbers: number[];
  memberNumbers: MemberNumber[];
}

const NumerologyCalculator = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    { name: "", day: "", month: "", year: "" },
  ]);
  const [yearRange, setYearRange] = useState({ start: "", end: "" });
  const [results, setResults] = useState<YearResult[] | null>(null);
  const [error, setError] = useState("");

  // Calculation functions
  const sumToSingleDigit = (num: number): number => {
    let sum = 0;
    String(num)
      .split("")
      .forEach((digit) => {
        sum += parseInt(digit);
      });
    if (sum > 9) {
      return sumToSingleDigit(sum);
    }
    return sum;
  };

  const calculatePersonNumber = (
    day: number,
    month: number,
    year: number
  ): number => {
    const paddedDay = day.toString().padStart(2, "0");
    const paddedMonth = month.toString().padStart(2, "0");
    const dateStr = `${paddedDay}${paddedMonth}${year}`;
    let sum = 0;
    dateStr.split("").forEach((digit) => {
      sum += parseInt(digit);
    });
    return sumToSingleDigit(sum);
  };

  const getYearNumber = (year: number): number => {
    return sumToSingleDigit(year);
  };

  const getLuckyNumbers = (yearNumber: number): number[] => {
    const luckyMap: Record<number, number[]> = {
      1: [1, 2, 3, 9],
      2: [1, 2, 7],
      3: [1, 3, 6, 9],
      4: [4, 5, 8],
      5: [1, 4, 5, 7],
      6: [3, 6, 8, 9],
      7: [2, 5, 7],
      8: [4, 6, 8],
      9: [1, 3, 6, 9],
    };
    return luckyMap[yearNumber];
  };

  // Form handlers
  const addFamilyMember = () => {
    setFamilyMembers([
      ...familyMembers,
      { name: "", day: "", month: "", year: "" },
    ]);
  };

  const removeFamilyMember = (index: number) => {
    if (familyMembers.length > 1) {
      const newMembers = familyMembers.filter((_, i) => i !== index);
      setFamilyMembers(newMembers);
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newMembers = [...familyMembers];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setFamilyMembers(newMembers);
  };

  const validateInputs = () => {
    if (!yearRange.start || !yearRange.end) {
      setError("Please enter both start and end years");
      return false;
    }

    if (parseInt(yearRange.end) < parseInt(yearRange.start)) {
      setError("End year must be greater than or equal to start year");
      return false;
    }

    for (let member of familyMembers) {
      if (!member.name || !member.day || !member.month || !member.year) {
        setError("Please fill in all fields for each family member");
        return false;
      }

      const day = parseInt(member.day);
      const month = parseInt(member.month);

      if (day < 1 || day > 31) {
        setError("Day must be between 1 and 31");
        return false;
      }

      if (month < 1 || month > 12) {
        setError("Month must be between 1 and 12");
        return false;
      }

      if (
        (month === 4 || month === 6 || month === 9 || month === 11) &&
        day > 30
      ) {
        setError(
          `${member.name}'s birth date is invalid. Month ${month} cannot have more than 30 days`
        );
        return false;
      }

      if (month === 2 && day > 29) {
        setError(
          `${member.name}'s birth date is invalid. February cannot have more than 29 days`
        );
        return false;
      }
    }

    setError("");
    return true;
  };

  const generateResults = () => {
    if (!validateInputs()) return;

    const years: YearResult[] = [];
    for (
      let year = parseInt(yearRange.start);
      year <= parseInt(yearRange.end);
      year++
    ) {
      const yearNum = getYearNumber(year);
      const luckyNums = getLuckyNumbers(yearNum);

      const memberNumbers = familyMembers.map((member) => {
        const num = calculatePersonNumber(
          parseInt(member.day),
          parseInt(member.month),
          year
        );
        return {
          name: member.name,
          number: num,
          isLucky: luckyNums.includes(num),
        };
      });

      years.push({
        year,
        yearNumber: yearNum,
        luckyNumbers: luckyNums,
        memberNumbers,
      });
    }
    setResults(years);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md mb-8 p-6">
        <h2 className="text-2xl font-bold mb-6">Family Numerology Calculator</h2>
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Family Members</h3>
            {familyMembers.map((member, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Day</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    placeholder="Day"
                    min="1"
                    max="31"
                    value={member.day}
                    onChange={(e) =>
                      handleInputChange(index, "day", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Month</label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    placeholder="Month"
                    min="1"
                    max="12"
                    value={member.month}
                    onChange={(e) =>
                      handleInputChange(index, "month", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Birth Year
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border rounded"
                    placeholder="Year"
                    value={member.year}
                    onChange={(e) =>
                      handleInputChange(index, "year", e.target.value)
                    }
                  />
                </div>
                <div>
                  {index === familyMembers.length - 1 ? (
                    <button
                      onClick={addFamilyMember}
                      className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFamilyMember(index)}
                      className="p-2 rounded bg-red-500 text-white hover:bg-red-600"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Start Year</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="Start Year"
                value={yearRange.start}
                onChange={(e) =>
                  setYearRange({ ...yearRange, start: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Year</label>
              <input
                type="number"
                className="w-full p-2 border rounded"
                placeholder="End Year"
                value={yearRange.end}
                onChange={(e) =>
                  setYearRange({ ...yearRange, end: e.target.value })
                }
              />
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700">
              {error}
            </div>
          )}
          <button
            onClick={generateResults}
            className="w-full p-2 rounded bg-green-500 text-white hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <Calculator className="h-4 w-4" />
            <span>Generate Numerology Table</span>
          </button>
        </div>
      </div>
      {results && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold mb-4">Numerology Results</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2 text-left">
                    Year (Number) [Lucky Numbers]
                  </th>
                  {familyMembers.map((member, index) => (
                    <th
                      key={index}
                      className="border p-2 text-center"
                    >{`${member.name} (${member.day}-${member.month})`}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((yearData) => (
                  <tr key={yearData.year} className="hover:bg-gray-50">
                    <td className="border p-2 text-left">
                      {`${yearData.year} (${yearData.yearNumber}) [${yearData.luckyNumbers.join(
                        ", "
                      )}]`}
                    </td>
                    {yearData.memberNumbers.map((member, index) => (
                      <td key={index} className="border p-2 text-center">
                        {member.number}{" "}
                        {member.isLucky && (
                          <span className="text-green-600 font-medium">
                            (LUCKY)
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default NumerologyCalculator;
