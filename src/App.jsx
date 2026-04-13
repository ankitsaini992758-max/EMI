import { useState } from 'react'
import './App.css'

function App() {
  const [amount, setAmount] = useState('50000')
  const [months, setMonths] = useState('12')
  const [appliedAmount, setAppliedAmount] = useState(50000)
  const [appliedMonths, setAppliedMonths] = useState(12)
  const [activeTab, setActiveTab] = useState('summary')
  const [showSettings, setShowSettings] = useState(false)
  const [downPaymentPercent, setDownPaymentPercent] = useState(39.08)
  const [shortTermDownPaymentPercent, setShortTermDownPaymentPercent] = useState(39.08)
  const [longTermInterestRate, setLongTermInterestRate] = useState(13)
  const [shortTermInterestRate, setShortTermInterestRate] = useState(11)
  const [draftDownPaymentPercent, setDraftDownPaymentPercent] = useState(39.08)
  const [draftShortTermDownPaymentPercent, setDraftShortTermDownPaymentPercent] = useState(39.08)
  const [draftLongTermInterestRate, setDraftLongTermInterestRate] = useState(13)
  const [draftShortTermInterestRate, setDraftShortTermInterestRate] = useState(11)

  const numericAmount = appliedAmount
  const numericMonths = appliedMonths

  const openSettings = () => {
    setDraftDownPaymentPercent(downPaymentPercent)
    setDraftShortTermDownPaymentPercent(shortTermDownPaymentPercent)
    setDraftLongTermInterestRate(longTermInterestRate)
    setDraftShortTermInterestRate(shortTermInterestRate)
    setShowSettings(true)
  }

  const saveSettings = () => {
    setDownPaymentPercent(draftDownPaymentPercent)
    setShortTermDownPaymentPercent(draftShortTermDownPaymentPercent)
    setLongTermInterestRate(draftLongTermInterestRate)
    setShortTermInterestRate(draftShortTermInterestRate)
    setShowSettings(false)
  }

  const applyInputs = () => {
    const parsedAmount = Math.max(0, Number(amount) || 0)
    const parsedMonths = Math.max(0, Math.floor(Number(months) || 0))
    setAppliedAmount(parsedAmount)
    setAppliedMonths(parsedMonths)
  }

  // Calculate EMI
  const initialInterestRate = 13 // 13% on initial amount
  const calculatedInterest = (numericAmount * initialInterestRate) / 100
  const totalPayable = numericAmount + calculatedInterest
  const activeDownPaymentPercent =
    numericMonths > 0 && numericMonths < 5 ? shortTermDownPaymentPercent : downPaymentPercent
  const downPayment = (totalPayable * activeDownPaymentPercent) / 100
  const remainingAmount = totalPayable - downPayment

  // Determine interest rate based on months
  const monthlyInterestRate = numericMonths >= 5 ? longTermInterestRate : shortTermInterestRate
  const monthlyEMI = numericMonths > 0 ? remainingAmount / numericMonths : 0
  const totalInterest = 0
  const totalAmountPayable = remainingAmount

  const monthOptions = [3, 6, 12, 24, 36, 48, 60]

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">⚡ Chandravanshi E-Scooty</h1>
          <p className="header-subtitle">EMI Calculator - Easy Financing Options</p>
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-wrapper">
          <div className="top-actions">
            <div className="brand-badge">Chandravanshi E-Scooty Showroom</div>
            <button
              type="button"
              className="settings-btn"
              onClick={() => (showSettings ? setShowSettings(false) : openSettings())}
            >
              ⚙ Settings
            </button>
          </div>

          {showSettings ? (
            <div className="settings-backdrop" onClick={() => setShowSettings(false)}>
              <aside className="settings-drawer" onClick={(event) => event.stopPropagation()}>
                <div className="settings-drawer-header">
                  <div>
                    <h3>Calculator Settings</h3>
                    <p>Adjust the percentages used in the EMI calculation.</p>
                  </div>
                  <button
                    type="button"
                    className="close-settings-btn"
                    onClick={() => setShowSettings(false)}
                    aria-label="Close settings"
                  >
                    ✕
                  </button>
                </div>

                <div className="settings-grid">
                  <div className="setting-field">
                    <label htmlFor="down-payment-percent">Down Payment (%) for 5+ Months</label>
                    <input
                      id="down-payment-percent"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={draftDownPaymentPercent}
                      onChange={(e) => setDraftDownPaymentPercent(Math.max(0, Number(e.target.value)))}
                      className="input-field"
                    />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="0.01"
                      value={draftDownPaymentPercent}
                      onChange={(e) => setDraftDownPaymentPercent(Number(e.target.value))}
                      className="slider"
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="short-term-down-payment-percent">Down Payment (%) for &lt; 5 Months</label>
                    <input
                      id="short-term-down-payment-percent"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={draftShortTermDownPaymentPercent}
                      onChange={(e) => setDraftShortTermDownPaymentPercent(Math.max(0, Number(e.target.value)))}
                      className="input-field"
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="long-term-rate">Interest Rate for 5+ Months (%)</label>
                    <input
                      id="long-term-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={draftLongTermInterestRate}
                      onChange={(e) => setDraftLongTermInterestRate(Math.max(0, Number(e.target.value)))}
                      className="input-field"
                    />
                  </div>

                  <div className="setting-field">
                    <label htmlFor="short-term-rate">Interest Rate for Less than 5 Months (%)</label>
                    <input
                      id="short-term-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={draftShortTermInterestRate}
                      onChange={(e) => setDraftShortTermInterestRate(Math.max(0, Number(e.target.value)))}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="settings-actions">
                  <button type="button" className="save-settings-btn" onClick={saveSettings}>
                    Save Settings
                  </button>
                </div>
              </aside>
            </div>
          ) : null}

          {/* Input Section */}
          <section className="input-section">
            <div className="input-group">
              <label htmlFor="amount">Price Amount (₹)</label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
                placeholder="Enter amount"
              />
              <div className="amount-slider-container">
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="5000"
                  value={numericAmount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="slider"
                />
                <div className="slider-labels">
                  <span>₹20K</span>
                  <span>₹500K</span>
                </div>
              </div>
            </div>

            <div className="input-group">
              {/* <label>EMI Months</label>
              <div className="months-selector">
                {monthOptions.map((month) => (
                  <button
                    key={month}
                    className={`month-btn ${months === month ? 'active' : ''}`} */}
                    {/* onClick={() => setMonths(month)} */}
                  {/* >
                    {month}
                  </button>
                ))} */}
              {/* </div> */}
              <div className="custom-month-input">
                <label htmlFor="custom-months">Enter custom months:</label>
                <input
                  id="custom-months"
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(e.target.value)}
                  className="input-field"
                  min="1"
                  max="84"
                />
              </div>
            </div>

            <div className="calc-action-row">
              <button type="button" className="primary-action-btn" onClick={applyInputs}>
                Show Calculations
              </button>
            </div>

            <div className="interest-rate-display">
              <div className="interest-info">
                <span className="interest-label">Interest Rate (Monthly):</span>
                <span className="interest-rate">{monthlyInterestRate}% p.a.</span>
              </div>
              <p className="interest-note">
                {numericMonths >= 5 
                  ? `✓ ${longTermInterestRate}% Interest Rate for Duration ≥ 5 Months` 
                  : `✓ ${shortTermInterestRate}% Interest Rate for Duration < 5 Months`}
              </p>
            </div>
          </section>

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
              onClick={() => setActiveTab('summary')}
            >
              📊 Summary
            </button>
            <button
              className={`tab-btn ${activeTab === 'breakdown' ? 'active' : ''}`}
              onClick={() => setActiveTab('breakdown')}
            >
              📈 Breakdown
            </button>
          </div>

          {/* Results Section */}
          <section className="results-section">
            {activeTab === 'summary' ? (
              <div className="results-grid">
                {/* Amount Purchased */}
                <div className="result-card amount-purchased">
                  <div className="card-icon">💰</div>
                  <h3>Amount Purchased</h3>
                  <p className="result-value">₹{numericAmount.toLocaleString('en-IN')}</p>
                </div>

                {/* Initial Interest */}
                <div className="result-card initial-interest">
                  <div className="card-icon">📊</div>
                  <h3>13% Interest</h3>
                  <p className="result-value">₹{Math.round(calculatedInterest).toLocaleString('en-IN')}</p>
                </div>

                {/* Total Payable */}
                <div className="result-card total-payable">
                  <div className="card-icon">💳</div>
                  <h3>Total Payable</h3>
                  <p className="result-value">₹{Math.round(totalPayable).toLocaleString('en-IN')}</p>
                </div>

                {/* Down Payment */}
                <div className="result-card down-payment">
                  <div className="card-icon">🏦</div>
                  <h3>Down Payment ({activeDownPaymentPercent}%)</h3>
                  <p className="result-value">₹{Math.round(downPayment).toLocaleString('en-IN')}</p>
                </div>

                {/* Remaining Amount */}
                <div className="result-card remaining-amount">
                  <div className="card-icon">📌</div>
                  <h3>Remaining Amount</h3>
                  <p className="result-value">₹{Math.round(remainingAmount).toLocaleString('en-IN')}</p>
                </div>

                {/* Monthly EMI */}
                <div className="result-card monthly-emi">
                  <div className="card-icon">📅</div>
                  <h3>Monthly EMI ({numericMonths} Months)</h3>
                  <p className="result-value">₹{Math.round(monthlyEMI).toLocaleString('en-IN')}</p>
                </div>
              </div>
            ) : (
              <div className="breakdown-section">
                <div className="breakdown-card">
                  <h3>Payment Breakdown</h3>
                  <div className="breakdown-item">
                    <span>Price of E-Scooty:</span>
                    <span className="value">₹{numericAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Initial Interest (13%):</span>
                    <span className="value">₹{Math.round(calculatedInterest).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-item total-line">
                    <span className="bold">Total Payable:</span>
                    <span className="value bold">₹{Math.round(totalPayable).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Down Payment ({activeDownPaymentPercent}%):</span>
                    <span className="value highlight">₹{Math.round(downPayment).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-item total-line">
                    <span className="bold">Remaining Amount for EMI:</span>
                    <span className="value bold">₹{Math.round(remainingAmount).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="breakdown-divider"></div>
                  <div className="breakdown-item">
                    <span>Duration:</span>
                    <span className="value">{numericMonths} Months</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Interest Rate:</span>
                    <span className="value">{monthlyInterestRate}% p.a.</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Monthly EMI:</span>
                    <span className="value highlight">₹{Math.round(monthlyEMI).toLocaleString('en-IN')}</span>
                  </div>
                  {/* <div className="breakdown-item">
                    <span>Total Interest (EMI Period):</span>
                    <span className="value">₹0</span>
                  </div> */}
                  <div className="breakdown-item total-line">
                    <span className="bold">Total Amount Payable (EMI):</span>
                    <span className="value bold">₹{Math.round(totalAmountPayable).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="payment-timeline">
                  <h3>Complete Payment Timeline</h3>
                  <div className="timeline-content">
                    <div className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-text">
                        <strong>Today:</strong> Down Payment ₹{Math.round(downPayment).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker"></div>
                      <div className="timeline-text">
                        <strong>Next {numericMonths} Months:</strong> ₹{Math.round(monthlyEMI).toLocaleString('en-IN')} per month
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="timeline-marker end"></div>
                      <div className="timeline-text">
                        <strong>Grand Total:</strong> ₹{(Math.round(downPayment) + Math.round(totalAmountPayable)).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Footer Note */}
          <div className="calculator-footer">
            <p>ⓘ This calculator provides an estimate. Actual EMI may vary based on bank policies and additional fees.</p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
