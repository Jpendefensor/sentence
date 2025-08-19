function formatDateFromToday(daysToAdd) {
  const date = new Date();
  // Use Math.floor instead of Math.round to be more conservative
  // Or better yet, don't round at all and let the date calculation handle fractional days
  date.setDate(date.getDate() + Math.floor(daysToAdd));
  return date.toLocaleDateString();
}

function toMonthsYears(days) {
  // Use more accurate conversion factors
  const DAYS_PER_YEAR = 365.25; // Accounts for leap years
  const DAYS_PER_MONTH = DAYS_PER_YEAR / 12; // 30.4375
  
  return {
    months: (days / DAYS_PER_MONTH).toFixed(2),
    years: (days / DAYS_PER_YEAR).toFixed(2)
  };
}

function calculate() {
  const years = parseFloat(document.getElementById('sentenceYears').value);
  let preActual = parseInt(document.getElementById('preDays').value);
  
  if (isNaN(years)) {
    document.getElementById('results').innerHTML = "";
    return;
  }

  if (isNaN(preActual)) {
    preActual = 0;
  }

  // Use accurate days per year calculation
  const DAYS_PER_YEAR = 365.25;
  const totalDays = years * DAYS_PER_YEAR;
  
  // Fixed conduct credit calculations
  // For 50% conduct credit: you get 0.5 days of conduct credit for each actual day
  const preConduct50 = preActual * 0.5;
  const preCredit50 = preActual + preConduct50;
  
  // For 15% conduct credit: you get 0.15 days of conduct credit for each actual day  
  const preConduct15 = preActual * 0.15;
  const preCredit15 = preActual + preConduct15;

  const rem50 = totalDays - preCredit50;
  const rem15 = totalDays - preCredit15;

  // Use more precise percentage calculations
  const ONE_THIRD = 1/3;
  const TWO_THIRDS = 2/3;

  const results = `
    <table>
      <tr><th>Calculation Step</th><th>Days</th><th>Months</th><th>Years</th><th>Release Date Estimate</th></tr>
      <tr><td>Total Sentence</td><td>${totalDays.toFixed(1)}</td><td>${(years * 12).toFixed(1)}</td><td>${years}</td><td>${formatDateFromToday(totalDays)}</td></tr>

      <tr><th></th><th></th><th></th><th></th><th></th></tr>

      <tr class="light-blue-row">
         <td>Pre-sentence Conduct Credit (Days) 50%</td><td>${preConduct50.toFixed(1)}</td>
         <td>${toMonthsYears(preConduct50).months}</td>
         <td>${toMonthsYears(preConduct50).years}</td>
         <td></td>
      </tr>
      <tr class="light-blue-row">
         <td><b>Total Pre-sentence Credit (Days) 50%</b></td>
         <td>${preCredit50.toFixed(1)}</td>
         <td>${toMonthsYears(preCredit50).months}</td>
         <td>${toMonthsYears(preCredit50).years}</td>
         <td></td>
      </tr>

      <tr class="blue-row">
          <td><b>Remaining Sentence After Pre-sentence Credit (Days) 50%</b></td><td>${rem50.toFixed(1)}</td>
          <td>${toMonthsYears(rem50).months}</td>
          <td>${toMonthsYears(rem50).years}</td>
          <td>${formatDateFromToday(rem50)}</td>
      </tr>

      <tr class="dark-blue-row">
          <td>Post-sentence Credit Rate (%) Serve 80%<br>(50% credit)</td><td>${(rem50 * 0.8).toFixed(1)}</td>
          <td>${toMonthsYears(rem50 * 0.8).months}</td>
          <td>${toMonthsYears(rem50 * 0.8).years}</td>
          <td>${formatDateFromToday(rem50 * 0.8)}</td>
      </tr>

      <tr class="dark-blue-row"><td>Post-sentence Credit Rate (%) Serve 50%<br>(50% credit)</td><td>${(rem50 * 0.5).toFixed(1)}</td>
          <td>${toMonthsYears(rem50 * 0.5).months}</td><td>${toMonthsYears(rem50 * 0.5).years}</td>
          <td>${formatDateFromToday(rem50 * 0.5)}</td></tr>

      <tr class="dark-blue-row"><td>Post-sentence Credit Rate (%) Serve 33.3% <br>(66.6% credit)</td><td>${(rem50 * ONE_THIRD).toFixed(1)}</td>
          <td>${toMonthsYears(rem50 * ONE_THIRD).months}</td><td>${toMonthsYears(rem50 * ONE_THIRD).years}</td>
          <td>${formatDateFromToday(rem50 * ONE_THIRD)}</td></tr>

      <tr><th></th><th></th><th></th><th></th><th></th></tr>

      <tr class="light-green-row">
         <td>Pre-sentence Conduct Credit (Days) 15%</td><td>${preConduct15.toFixed(1)}</td>
         <td>${toMonthsYears(preConduct15).months}</td>
         <td>${toMonthsYears(preConduct15).years}</td>
         <td></td>
      </tr>
      <tr class="light-green-row">
         <td><b>Total Pre-sentence Credit (Days) 15%</b></td>
         <td>${preCredit15.toFixed(1)}</td>
         <td>${toMonthsYears(preCredit15).months}</td>
         <td>${toMonthsYears(preCredit15).years}</td>
         <td></td>
      </tr>

      <tr class="green-row">
          <td><b>Remaining Sentence After Pre-sentence Credit (Days) 15%</b></td><td>${rem15.toFixed(1)}</td>
          <td>${toMonthsYears(rem15).months}</td>
          <td>${toMonthsYears(rem15).years}</td>
          <td>${formatDateFromToday(rem15)}</td>
      </tr>

      <tr class="dark-green-row">
          <td>Post-sentence Credit Rate (%) Serve 85%<br>(15% credit)</td>
          <td>${(rem15 * 0.85).toFixed(1)}</td>
          <td>${toMonthsYears(rem15 * 0.85).months}</td>
          <td>${toMonthsYears(rem15 * 0.85).years}</td>
          <td>${formatDateFromToday(rem15 * 0.85)}</td>
      </tr>

      <tr class="dark-green-row"><td>Post-sentence Credit Rate (%) Serve 66.6%<br>(33.3% credit)</td>
          <td>${(rem15 * TWO_THIRDS).toFixed(1)}</td>
          <td>${toMonthsYears(rem15 * TWO_THIRDS).months}</td>
          <td>${toMonthsYears(rem15 * TWO_THIRDS).years}</td>
          <td>${formatDateFromToday(rem15 * TWO_THIRDS)}</td></tr>

      <tr class="dark-green-row"><td>Post-sentence Credit Rate (%) Serve 50% <br>(50% credit)</td>
          <td>${(rem15 * 0.5).toFixed(1)}</td>
          <td>${toMonthsYears(rem15 * 0.5).months}</td>
          <td>${toMonthsYears(rem15 * 0.5).years}</td>
          <td>${formatDateFromToday(rem15 * 0.5)}</td>
      </tr>
          
      <tr><th></th><th></th><th></th><th></th><th></th></tr>
    </table>
  `;

  document.getElementById('results').innerHTML = results;
}

document.getElementById('sentenceYears').addEventListener('input', calculate);
document.getElementById('preDays').addEventListener('input', calculate);