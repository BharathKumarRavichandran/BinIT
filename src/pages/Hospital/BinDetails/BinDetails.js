import React, { useState, useEffect } from "react";
import { withRouter } from 'react-router-dom';

import socketIOClient from "socket.io-client";
import { toast } from 'react-toastify';

import { CircularProgress, Box, Grid, responsiveFontSizes } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, PieChart, Pie, Cell, Sector } from "recharts";

import MUIDataTable from "mui-datatables";

// styles
import useStyles from "./styles";

// components
import Widget from "../../../components/Widget/Widget";
import PageTitle from "../../../components/PageTitle/PageTitle";
import { Typography } from "../../../components/Wrappers/Wrappers";
import Dot from "../../../components/Sidebar/components/Dot";

// Importing API utils
import { getBinDetails } from '../../../utils/api/bin.helper';
import { url } from '../../../config/config';

const datatableData = [
	["Joe James", "Accident and emergency (A&E)", "16 KG", "2019-09-21 00:00:00"],
	["John Walsh", "Admissions", "13 KG", "2019-09-21 00:00:00"],
	["Bob Herm", "Anesthetics", "12 KG", "2019-09-21 00:00:00"],
	["James Houston", "Cardiology", "10 KG", "2019-09-21 00:00:00"],
	["Prabhakar Linwood", "Coronary Care Unit (CCU)", "8 KG", "2019-09-21 00:00:00"],
	["Kaui Ignace", "Diagnostic Imaging", "7KG", "2019-09-21 00:00:00"],
	["Esperanza Susanne", "Discharge Lounge", "4 KG", "2019-09-21 00:00:00"],
	["Christian Birgitte", "Finance Department", "1 KG", "2019-09-21 00:00:00"],
];

const BinDetails = (props) => {
	var classes = useStyles();
	var theme = useTheme();
	// theme = responsiveFontSizes(theme);

	// local
	const [isLoading, setIsLoading] = useState(false);
	const [activeIndex, setActiveIndexId] = useState(0);

	// Initialize bin parameters
	const [binId, setBinId] = useState(props.match.params.binId);
	const [binLocation, setBinLocation] = useState('Hospital');
	const [binType, setBinType] = useState('Pathological waste');
	const [binCapacity, setBinCapacity] = useState(5);
	const [binWeight, setBinWeight] = useState(1);
	const [binEmpty, setBinEmpty] = useState(4);
	const [lastAccessedAt, setLastAccessedAt] = useState('2019-09-21 00:00:00');
	const [lastAccessedBy, setLastAccessedBy] = useState('Joe James');

	const [PieChartData, setPieChartData] = useState([
		{ name: "Filled", value: 1, color: "primary" },
		{ name: "Empty", value: 4, color: "secondary" }
	]);

	// Initialize contact details
	const [maintainerName, setMaintainerName] = useState('Joe James');
	const [maintainerDept, setMaintainerDept] = useState('Accident and emergency (A&E)');
	const [maintainerPhNo, setMaintainerPhNo] = useState('+91 89542 23433');
	const [maintainerEmail, setMaintainerEmail] = useState('joejames@gmail.com');

	const fetchBinDetails = async (binId) => {
		try {
			const serverResponse = await getBinDetails(binId);
			console.log(serverResponse);
			if (serverResponse.data.status_code === 200 && serverResponse.data.data) {
				let reqData = serverResponse.data.data;

				// Set Bin params
				setBinId(reqData.bin.bin_id);
				setBinLocation('Hospital');
				setBinType(reqData.bin.type);
				setBinCapacity(reqData.bin.capacity);
				setBinWeight(reqData.bin.weight);
				setLastAccessedAt(reqData.bin.updatedAt);
				setLastAccessedBy('Joe James');

				// Set Handler details
				/*
				setMaintainerName(reqData.handler.name);
				setMaintainerDept(reqData.handler.department);
				setMaintainerPhNo(reqData.handler.phone_number);
				setMaintainerEmail(reqData.handler.email);
				*/
			}
			else {
				if (serverResponse.data.status_code === 400) {
					props.history.push('/hospitals/bins');
				}
				else if (serverResponse.data.message)
					toast.error(serverResponse.data.message);
				else
					toast.error(serverResponse.statusText);
				props.history.push('/hospitals/bins');
			}
		} catch (error) {
			toast.error(error.toString());
			props.history.push('/bin');
		}
	};

	useEffect(() => {
		const endpoint = url.API_BASE_URL;
		const socket = socketIOClient(endpoint);
		socket.on("binWeightEmitted", async (data) => {
			let updatedWeight = parseFloat(data.weight);
			setBinWeight(updatedWeight);
			setBinEmpty(binCapacity-updatedWeight);
			setPieChartData([
				{
					name: PieChartData[0].name,
					value: updatedWeight,
					color: "primary"
				},
				{
					name: PieChartData[1].name,
					value: binCapacity-updatedWeight,
					color: "secondary"
				}
			]);
		});
		async function fetchAPI(binId) {
			try {
				// Check status 200 otherwise redirect to Bins page
				setIsLoading(true);
				await fetchBinDetails(binId);
				setIsLoading(false);
			} catch (error) {
				toast.error(error.toString());
			}
		};
		fetchAPI(props.match.params.binId);
	}, []);

	if (isLoading) {
		return <Box className={classes.centeredContainer}><CircularProgress size={80} /></Box>;
	} else {
		return (
			<>
				<PageTitle title="Smart Bin Details" button="Latest Reports" />

				<Grid container spacing={4}>

					<Grid item xs={12} sm={12} md={12} lg={4}>
						<Widget title="Level of wastes" upperTitle className={classes.card} disableWidgetMenu>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={9} md={3} lg={9}>
									<ResponsiveContainer width="100%" height={244}>
										<PieChart margin={{ left: theme.spacing(2) }}>
											<Pie
												data={PieChartData}
												innerRadius={50}
												outerRadius={90}
												dataKey="value"
											>
												{PieChartData.map((entry, index) => (
													<Cell
														key={`cell-${index}`}
														fill={theme.palette[entry.color].main}
													/>
												))}
											</Pie>
										</PieChart>
									</ResponsiveContainer>
								</Grid>
								<Grid item xs={12} sm={3} md={3} lg={3}>
									<div className={classes.pieChartLegendWrapper}>
										{PieChartData.map(({ name, value, color }, index) => (
											<div key={color} className={classes.legendItemContainer}>
												<Dot color={color} />
												<Typography style={{ whiteSpace: "nowrap" }}>
													&nbsp;{name}&nbsp;
                          </Typography>
												<Typography color="text" colorBrightness="secondary">
													&nbsp;{value}
												</Typography>
											</div>
										))}
									</div>
								</Grid>
							</Grid>
						</Widget>
					</Grid>

					<Grid item xs={12} sm={6} md={6} lg={4}>
						<Widget title="Bin Details" disableWidgetMenu>
							<Box className={classes.boxContent}>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											ID:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography>
											{binId}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Location:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography>
											{binLocation}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Type:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{binType}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Capacity:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{`${binCapacity} KG`}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Current weight:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography>
											{`${binWeight} KG`}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Last accessed at:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{lastAccessedAt}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Last accessed by:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{lastAccessedBy}
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Widget>
					</Grid>

					<Grid item xs={12} sm={6} md={6} lg={4}>
						<Widget title="Contact Details" disableWidgetMenu>
							<Box className={classes.boxContent}>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Maintainer:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography >
											{maintainerName}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Department:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{maintainerDept}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											Phone Number:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{maintainerPhNo}
										</Typography>
									</Grid>
								</Grid>
								<Grid container spacing={2}>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldName}>
											E-Mail:
                      </Typography>
									</Grid>
									<Grid item xs={6} md={6} lg={6}>
										<Typography className={classes.fieldValue}>
											{maintainerEmail}
										</Typography>
									</Grid>
								</Grid>
							</Box>
						</Widget>
					</Grid>

				</Grid>

				<Grid container spacing={4}>
					<Grid item xs={12}>
						<MUIDataTable
							title="Access Logs"
							data={datatableData}
							columns={["ACCESSED BY", "DEPARTMENT", "WEIGHT", "TIME"]}
							options={{
								pagination: true,
								selectableRows: false
							}}
						/>
					</Grid>
				</Grid>
				{/* 
          <Grid item xs={12} md={12}>
            <Widget title="Pie Chart with Tooltips" noBodyPadding upperTitle>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={200} height={300}>
                  <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={PieChartData}
                    cx={200}
                    cy={150}
                    innerRadius={60}
                    outerRadius={80}
                    fill={theme.palette.secondary.dark}
                    dataKey="value"
                    onMouseEnter={(e, id) => setActiveIndexId(id)}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          */}
			</>
		);
	}
}

export default withRouter(BinDetails);

// #######################################################################

function renderActiveShape(props) {
	var RADIAN = Math.PI / 180;
	var {
		cx,
		cy,
		midAngle,
		innerRadius,
		outerRadius,
		startAngle,
		endAngle,
		fill,
		payload,
		percent,
		value,
	} = props;
	var sin = Math.sin(-RADIAN * midAngle);
	var cos = Math.cos(-RADIAN * midAngle);
	var sx = cx + (outerRadius + 10) * cos;
	var sy = cy + (outerRadius + 10) * sin;
	var mx = cx + (outerRadius + 30) * cos;
	var my = cy + (outerRadius + 30) * sin;
	var ex = mx + (cos >= 0 ? 1 : -1) * 22;
	var ey = my;
	var textAnchor = cos >= 0 ? "start" : "end";

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				fill={fill}
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill={fill}
			/>
			<path
				d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
				stroke={fill}
				fill="none"
			/>
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				textAnchor={textAnchor}
				fill="#333"
			>{`${value}`}</text>
			<text
				x={ex + (cos >= 0 ? 1 : -1) * 12}
				y={ey}
				dy={18}
				textAnchor={textAnchor}
				fill="#999"
			>
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
}


