import { useState } from "react";
const result = eval(display).toString();
import "../assets/css/calculator.css";

function Calculator() {
  const [activeTab, setActiveTab] = useState("STANDARD");

  // =========================
  // STANDARD CALCULATOR
  // =========================
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState([]);

  const handleClick = (value) => {
    setDisplay(display === "0" ? value : display + value);
  };

  const clear = () => setDisplay("0");
  const calculate = () => {
  try {
    const result = evaluate(display).toString();
    setHistory([`${display} = ${result}`, ...history]);
    setDisplay(result);
  } catch {
    setDisplay("Error");
  }
};
 

  // =========================
  // GST
  // =========================
  const [gstAmount, setGstAmount] = useState("");
  const [gstRate, setGstRate] = useState(18);
  const [gstResult, setGstResult] = useState(null);

  const calculateGST = () => {
    const gst = (gstAmount * gstRate) / 100;
    setGstResult({
      gst,
      total: Number(gstAmount) + gst,
      cgst: gst / 2,
      sgst: gst / 2,
    });
  };

  // =========================
  // DISCOUNT
  // =========================
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [discountResult, setDiscountResult] = useState(null);

  const calculateDiscount = () => {
    const saved = (price * discount) / 100;
    setDiscountResult({
      saved,
      final: price - saved,
    });
  };

  // =========================
  // PROFIT / LOSS
  // =========================
  const [cp, setCp] = useState("");
  const [sp, setSp] = useState("");
  const [profitLoss, setProfitLoss] = useState(null);

  const calculateProfitLoss = () => {
    const cost = Number(cp);
    const sell = Number(sp);

    if (sell > cost) {
      setProfitLoss({
        type: "Profit",
        value: sell - cost,
      });
    } else {
      setProfitLoss({
        type: "Loss",
        value: cost - sell,
      });
    }
  };

  // =========================
  // MARGIN
  // =========================
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [margin, setMargin] = useState(null);

  const calculateMargin = () => {
    const m = ((revenue - cost) / revenue) * 100;
    setMargin(m.toFixed(2));
  };

  // =========================
  // EMI
  // =========================
  const [loan, setLoan] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEMI = () => {
    const r = rate / 12 / 100;
    const emiValue =
      (loan * r * Math.pow(1 + r, months)) /
      (Math.pow(1 + r, months) - 1);

    setEmi(emiValue.toFixed(2));
  };

  // =========================
  // PERCENTAGE
  // =========================
  const [percent, setPercent] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [percentResult, setPercentResult] = useState(null);

  const calculatePercent = () => {
    setPercentResult((percent / 100) * totalValue);
  };

  // =========================
  // UI
  // =========================
  return (
    <div className="calculator-page">
      <h1>🧮 All-in-One Business Calculator</h1>

      {/* TABS */}
      <div className="calc-tabs">
        {[
          "STANDARD",
          "GST",
          "DISCOUNT",
          "PROFIT",
          "MARGIN",
          "EMI",
          "PERCENT",
        ].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </button>
        ))}
      </div>

      {/* STANDARD */}
      {activeTab === "STANDARD" && (
        <div className="calc-box">
          <div className="display">{display}</div>

          <div className="grid">
            {[
              "7","8","9","/",
              "4","5","6","*",
              "1","2","3","-",
              "0",".","=","+",
            ].map((btn, i) => (
              <button
                key={i}
                onClick={() =>
                  btn === "=" ? calculate() : handleClick(btn)
                }
              >
                {btn}
              </button>
            ))}
          </div>

          <button className="clear" onClick={clear}>
            Clear
          </button>

          <div className="history">
            <h3>History</h3>
            {history.map((h, i) => (
              <p key={i}>{h}</p>
            ))}
          </div>
        </div>
      )}

      {/* GST */}
      {activeTab === "GST" && (
        <div className="calc-box">
          <input
            placeholder="Amount"
            onChange={(e) => setGstAmount(e.target.value)}
          />

          <select
            onChange={(e) => setGstRate(e.target.value)}
          >
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>

          <button onClick={calculateGST}>
            Calculate GST
          </button>

          {gstResult && (
            <div className="result">
              <p>Total: ₹{gstResult.total}</p>
              <p>GST: ₹{gstResult.gst}</p>
            </div>
          )}
        </div>
      )}

      {/* DISCOUNT */}
      {activeTab === "DISCOUNT" && (
        <div className="calc-box">
          <input
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />

          <input
            placeholder="Discount %"
            onChange={(e) => setDiscount(e.target.value)}
          />

          <button onClick={calculateDiscount}>
            Calculate
          </button>

          {discountResult && (
            <div className="result">
              <p>Final: ₹{discountResult.final}</p>
            </div>
          )}
        </div>
      )}

      {/* PROFIT / LOSS */}
      {activeTab === "PROFIT" && (
        <div className="calc-box">
          <input placeholder="Cost Price" onChange={(e) => setCp(e.target.value)} />
          <input placeholder="Selling Price" onChange={(e) => setSp(e.target.value)} />

          <button onClick={calculateProfitLoss}>Calculate</button>

          {profitLoss && (
            <div className="result">
              <p>{profitLoss.type}: ₹{profitLoss.value}</p>
            </div>
          )}
        </div>
      )}

      {/* MARGIN */}
      {activeTab === "MARGIN" && (
        <div className="calc-box">
          <input placeholder="Revenue" onChange={(e) => setRevenue(e.target.value)} />
          <input placeholder="Cost" onChange={(e) => setCost(e.target.value)} />

          <button onClick={calculateMargin}>Calculate</button>

          {margin && (
            <div className="result">
              <p>Margin: {margin}%</p>
            </div>
          )}
        </div>
      )}

      {/* EMI */}
      {activeTab === "EMI" && (
        <div className="calc-box">
          <input placeholder="Loan Amount" onChange={(e) => setLoan(e.target.value)} />
          <input placeholder="Interest Rate %" onChange={(e) => setRate(e.target.value)} />
          <input placeholder="Months" onChange={(e) => setMonths(e.target.value)} />

          <button onClick={calculateEMI}>Calculate EMI</button>

          {emi && (
            <div className="result">
              <p>EMI: ₹{emi}</p>
            </div>
          )}
        </div>
      )}

      {/* PERCENT */}
      {activeTab === "PERCENT" && (
        <div className="calc-box">
          <input placeholder="Percent %" onChange={(e) => setPercent(e.target.value)} />
          <input placeholder="Total Value" onChange={(e) => setTotalValue(e.target.value)} />

          <button onClick={calculatePercent}>Calculate</button>

          {percentResult && (
            <div className="result">
              <p>Result: {percentResult}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;