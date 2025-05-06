function formatDateFromToday(daysToAdd) {
  const date = new Date();
  date.setDate(date.getDate() + Math.round(daysToAdd));
  return date.toLocaleDateString();
}

function toMonthsYears(days) {
  return {
    months: (days / 30.44).toFixed(2),
    years: (days / 365).toFixed(2)
  };
}

function calculate() {
  const years = parseFloat(document.getElementById('sentenceYears').value);
  let preActual = parseInt(document.getElementById('preDays').value);
  if (isNaN(years)) {
    document.getElementById('results').innerHTML = "";
    return;
  }

  if (isNaN(years) || isNaN(preActual)) {
    preActual = 0;
  }

  const totalDays = years * 365;
  const preConduct50 = preActual * 0.5;
  const preCredit50 = preActual + preConduct50;
  const preConduct15 = preActual * 0.15;
  const preCredit15 = preActual + preConduct15;

  const rem50 = totalDays - preCredit50;
  const rem15 = totalDays - preCredit15;

  const results = `
    <table>
      <tr><th>Calculation Step</th><th>Days</th><th>Months</th><th>Years</th><th>Credit calculation from today</th></tr>
      <tr><td>Total Sentence</td><td>${totalDays}</td><td>${years * 12}</td><td>${years}</td><td>—</td></tr>

      <tr><th></th><th></th><th></th><th></th><th></th></tr>

      <tr class="light-blue-row">
         <td>Pre-sentence Conduct Credit (Days) 50%</td><td>${preConduct50.toFixed(0)}</td>
         <td>${toMonthsYears(preConduct50).months}</td>
         <td>${toMonthsYears(preConduct50).years}</td>
         <td>${formatDateFromToday(preConduct50)}</td>
      </tr>
      <tr class="light-blue-row">
         <td><b>Total Pre-sentence Credit (Days) 50%</b></td>
         <td>${preCredit50.toFixed(0)}</td>
         <td>${toMonthsYears(preCredit50).months}</td>
         <td>${toMonthsYears(preCredit50).years}</td>
         <td></td>
      </tr>

      <tr class="blue-row">
          <td><b>Remaining Sentence After Pre-sentence Credit (Days) 50%</b></td><td>${rem50.toFixed(0)}</td>
          <td>${toMonthsYears(rem50).months}</td>
          <td>${toMonthsYears(rem50).years}</td>
          <td>${formatDateFromToday(rem50)}</td>
      </tr>

      <tr class="dark-blue-row">
          <td>Post-sentence Credit Rate (%) Serve 80%<br>(50% credit)</td><td>${(rem50 * 0.8).toFixed(0)}</td>
          <td>${toMonthsYears(rem50 * 0.8).months}</td>
          <td>${toMonthsYears(rem50 * 0.8).years}</td>
          <td>${formatDateFromToday(rem50 * 0.8)}</td>
      </tr>

      <tr class="dark-blue-row"><td>Post-sentence Credit Rate (%) Serve 50%<br>(50% credit)</td><td>${(rem50 * 0.5).toFixed(0)}</td>
          <td>${toMonthsYears(rem50 * 0.5).months}</td><td>${toMonthsYears(rem50 * 0.5).years}</td>
          <td>${formatDateFromToday(rem50 * 0.5)}</td></tr>

      <tr class="dark-blue-row"><td>Post-sentence Credit Rate (%) Serve 33.3 % <br>(50% credit)</td><td>${(rem50 * 0.333).toFixed(0)}</td>
          <td>${toMonthsYears(rem50 * 0.333).months}</td><td>${toMonthsYears(rem50 * 0.333).years}</td>
          <td>${formatDateFromToday(rem50 * 0.333)}</td></tr>

      <tr><th></th><th></th><th></th><th></th><th></th></tr>

      <tr class="green-row"><td>Pre-sentence Conduct Credit (Days)</td><td>${preConduct15.toFixed(0)}</td><td>—</td><td>—</td><td>—</td></tr>
      <tr class="green-row"><td>Total Pre-sentence Credit (Days)</td><td>${preCredit15.toFixed(0)}</td><td>—</td><td>—</td><td>—</td></tr>

      <tr class="dark-green-row"><td>Remaining Sentence @ 85%<br>(15% credit)</td><td>${(rem15 * 0.85).toFixed(0)}</td>
          <td>${toMonthsYears(rem15 * 0.85).months}</td><td>${toMonthsYears(rem15 * 0.85).years}</td>
          <td>${formatDateFromToday(rem15 * 0.85)}</td></tr>

      <tr class="dark-green-row"><td>Remaining Sentence @ 66.6%<br>(15% credit)</td><td>${(rem15 * 0.666).toFixed(0)}</td>
          <td>${toMonthsYears(rem15 * 0.666).months}</td><td>${toMonthsYears(rem15 * 0.666).years}</td>
          <td>${formatDateFromToday(rem15 * 0.666)}</td></tr>

      <tr class="dark-green-row"><td>Remaining Sentence @ 50%<br>(15% credit)</td><td>${(rem15 * 0.5).toFixed(0)}</td>
          <td>${toMonthsYears(rem15 * 0.5).months}</td><td>${toMonthsYears(rem15 * 0.5).years}</td>
          <td>${formatDateFromToday(rem15 * 0.5)}</td></tr>
          
      <tr><th></th><th></th><th></th><th></th><th></th></tr>
    </table>
  `;

  document.getElementById('results').innerHTML = results;
}

document.getElementById('sentenceYears').addEventListener('input', calculate);
document.getElementById('preDays').addEventListener('input', calculate);
