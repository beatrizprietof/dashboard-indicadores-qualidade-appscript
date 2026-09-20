function doGet() {

  return HtmlService.createTemplateFromFile('Index')

    .evaluate()

    .setTitle('Indicadores de Qualidade')

    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)

    .addMetaTag('viewport', 'width=device-width, initial-scale=1');

}



/**

 * Lê e estrutura os dados das 4 abas e enriquece com mapeamento de Supervisor.

 */

function getDashboardData() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

 

  if (!ss) {

    throw new Error("Não foi possível localizar a planilha ativa.");

  }



  const sheets = ss.getSheets();

 

  // Mapeamento automático de Supervisor via aba 'Gestão de Pessoas'

  const supervisorMap = {};

  const gpSheet = sheets.find(s => {

    const name = s.getName().toLowerCase();

    return name.includes("gestão_de_pessoas") || name.includes("gestao_de_pessoas") || name.includes("gestão de pessoas") || name.includes("gestao de pessoas");

  });



  if (gpSheet) {

    const gpData = gpSheet.getDataRange().getDisplayValues();

    if (gpData && gpData.length > 0) {

      gpData.forEach(row => {

        const email0 = String(row[0] || '').trim().toLowerCase();

        const email3 = String(row[3] || '').trim().toLowerCase();

        const sup = String(row[4] || '').trim();

       

        if (sup && sup !== 'NaN' && sup !== 'undefined') {

          if (email0 && email0.includes('@')) supervisorMap[email0] = sup;

          if (email3 && email3.includes('@')) supervisorMap[email3] = sup;

        }

      });

    }

  }



  const targetSheets = {

    entrada: "Entrada Facilitada [diag]",

    overpricing: "Overpricing [diag]",

    despublicados: "Despublicados [diag]",

    descartes: "Descartes [diag]"

  };

 

  const result = {

    entrada: [],

    overpricing: [],

    despublicados: [],

    descartes: []

  };



  for (let key in targetSheets) {

    const targetName = targetSheets[key].toLowerCase().trim();

    const sheet = sheets.find(s => s.getName().toLowerCase().trim() === targetName);



    if (sheet) {

      const data = sheet.getDataRange().getDisplayValues();

      if (data && data.length > 1) {

        const headers = data[0].map(h => String(h).trim());

       

        const supColIdx = headers.findIndex(h => {

          const l = h.toLowerCase();

          return l === 'supervisor' || l === 'supervisão' || l === 'líder' || l === 'gestor';

        });



        for (let i = 1; i < data.length; i++) {

          let rowObj = {};

          let hasData = false;

          data[i].forEach((cell, idx) => {

            if (headers[idx]) {

              const val = String(cell).trim();

              rowObj[headers[idx]] = val;

              if (val !== "") hasData = true;

            }

          });



          if (hasData) {

            const analystEmail = String(rowObj['e-mail do analista'] || rowObj['analista'] || '').trim().toLowerCase();

            let supervisor = supColIdx !== -1 ? rowObj[headers[supColIdx]] : '';

           

            if (!supervisor && analystEmail && supervisorMap[analystEmail]) {

              supervisor = supervisorMap[analystEmail];

            }

           

            rowObj['supervisor'] = supervisor || 'Não Mapeado';

            result[key].push(rowObj);

          }

        }

      }

    }

  }



  return result;

} 

