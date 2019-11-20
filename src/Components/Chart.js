import React from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import axios from 'axios';

// Generate Sales Data
function createData(date, amount) {
  return { date, amount };
}

const data = [
  createData('00:00', 0),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

const config = {
	headers: {
		"Authorization": "Bearer " + sessionStorage.getItem('token'),
		'Content-Type': 'application/json'
	}
}

export default function Chart() {

  const [Moves, setMoves] = React.useState('')
  React.useEffect(() => {
    axios.get('http://localhost:3000/moves/daily-balance', config)
      .then(res => {
        console.log(res.data)
        let data = res.data;
        let endata = [];
        data.forEach(element => {
          let elementDate = element.date.substring(5, element.date.indexOf("T"));
          if (element.type === 'expense') {
            endata.push(createData(elementDate, element.amount*(-1)))
          } else if (element.type === 'income') {
            endata.push(createData(elementDate, element.amount))
          }
        });
        setMoves(endata);
        console.log(endata);
      }).catch(err => {
        console.log(err);
      });
  }, [])

  console.log(data);
  // console.log(Moves);

  return (
    <React.Fragment>
      <ResponsiveContainer>
        <LineChart
          data={Moves}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" >
          </XAxis>
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Balance
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}