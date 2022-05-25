import React, { useState, useEffect } from "react";
import "./Analaytics.css";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { getAttendedAppointments } from "../../Actions/appointmentActions";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts";

const EarningAnalytics = () => {
  const [earningsData, setEarningsData] = useState([]);
  const userstate = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userstate;
  const [earning, setEarning] = useState(0);
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [user, setUser] = useState("");
  useEffect(async () => {
    let response = await getAttendedAppointments(currentUser.userType);
    if (response) {
      console.log(response);
      console.log("pendingAppointments>>", response);
      setCompletedAppointments(response);
      let total = 0;

      let array = [];
      let dataArray = [];
      let t = new Date(Date.now()).getMonth();
      const start = new Date(`${t + 1}/01/2022`);
      const end = new Date(Date.now());
      let loop = new Date(start);
      while (loop <= end) {
        console.log(loop);
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
        array.push({
          date: new Date(newDate).toDateString(),
          earning: 0,
        });
      }
      response.map((r) => {
        total = total + r?.lawyer?.appointmentFee;
      });
      setEarning(total);

      /*************** */
      console.log("response", response);
      array.map((a, i) => {
        let temp = {};
        let isrunonce = false;
        response.map((r) => {
          if (!isrunonce) {
            if (
              new Date(r?.appointmentDate).setHours(0, 0, 0, 0) <
                new Date(a?.date).setHours(0, 0, 0, 0) ||
              new Date(r?.appointmentDate).setHours(0, 0, 0, 0) >
                new Date(a?.date).setHours(0, 0, 0, 0)
            ) {
              temp = a;
            } else {
              temp = {
                date: new Date(r?.appointmentDate).toDateString(),
                earning: r?.lawyer?.appointmentFee,
              };
              isrunonce = true;
            }
          }
        });

        dataArray.push(temp);
      });

      setEarningsData(dataArray);
    }
  }, []);

  useEffect(() => {
    api
      .get(`/user/getUserById/${currentUser?.id}`)
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          console.log("user>>>>>>>>>", user);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="profile__analytics earning__analytics">
      <h1>Earning Analytics</h1>
      <div className="row__one">
        <div>
          {" "}
          <h5>Total Earnings </h5> <h5>{earning} PKR</h5>
          {/* <div className="row__two graph__container"> </div> */}
        </div>
        {/* <ResponsiveContainer width="100%" aspect={1.5}>
          <BarChart
            width={500}
            height={300}
            data={earningsData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="earning" fill="#8884d8" />
            
          </BarChart>
        </ResponsiveContainer> */}
        <ResponsiveContainer width="100%" aspect={1.5}>
          <LineChart
            data={earningsData}
            width={600}
            height={500}
            margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={"preserveStartEnd"}
              tickFormatter={(value) => value}
            />
            <YAxis />
            <Tooltip contentStyle={{ backgroundColor: "yellow" }} />
            <Legend />

            <Line
              type="monotone"
              dataKey="earning"
              stroke="green"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        {/* <h1 className="chart-heading">Area Chart</h1>
          <ResponsiveContainer width="100%" aspect={3}>
            <AreaChart
              width={500}
              height={300}
              data={pdata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="student"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </ResponsiveContainer>
          <h1 className="chart-heading">Bar Chart</h1>
          <ResponsiveContainer width="100%" aspect={3}>
            <BarChart
              width={500}
              height={300}
              data={pdata}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="student" fill="#8884d8" />
              <Bar dataKey="fees" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer> */}
      </div>
    </div>
  );
};

export default EarningAnalytics;
