// This function is the endpoint's request handler.
exports = async function({ query, headers, body}, response) {
    // Data can be extracted from the request as follows:
    const moment = require("moment");
    console.log(JSON.stringify(query))
    const {startDate, endDate} = query;
    console.log("startDate, endDate: ", startDate, endDate);
    const transactions = context.services.get("mongodb-atlas").db("easy-control").collection("transactions");
    const salesByBarista = await transactions.aggregate([
        {
          $match: {
            date_close_date: {
              $gte: `${startDate} 00:00:00`,
              $lte: `${endDate} 23:59:59`
            }
          }
        },
        {
          $group: {
            _id: {
              name: "$name",
              date: { $dateToString: { format: "%d-%m-%Y", date: { $toDate: "$date_close_date" } } }
            },
            total_payed_sum: { $sum: { $toDouble: { $divide: [{ $toDouble: "$payed_sum" }, 100] } } },
            number_of_transactions: { $sum: 1 },
          }
        },
        {
          $project: {
            _id: 0,
            name: "$_id.name",
            date_close_date: "$_id.date",
            total_payed_sum: 1,
            number_of_transactions: 1,
            'bonus_3%': {
              $round: [{ $multiply: ["$total_payed_sum", 0.03] }, 0]
            },
            average_check: {
              $round: [{ $divide: ["$total_payed_sum", "$number_of_transactions"] }, 0]
            }
          }
        },
        {
          $sort: {
            date_close_date: 1
          }
        }
      ]).toArray();

    return  salesByBarista.sort((a,b) => {
      const date1 = moment(a.date_close_date, 'DD-MM-YYYY');
      const date2 =  moment(b.date_close_date, 'DD-MM-YYYY')
      return date1.diff(date2)
    });
};
