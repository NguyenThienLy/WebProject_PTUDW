
//Biểu đồ tròn cấu trúc 
var ctxPieChar = document.getElementById('structureProductChart').getContext('2d');
//Biểu đồ đường thể hiện lượt xem
var ctxLineViewChart = document.getElementById('accessTimesLineChart').getContext('2d');
//Biểu đồ thể hiện doanh thu trong ngày
var ctxLineRevenueChart = document.getElementById('revenueLineChart').getContext('2d');
//Biểu đồ cột thể hiện sản phẩm bán chạy
var ctxBarChar = document.getElementById('TopProductBarChart').getContext('2d');

//Dữ liệu biểu đồ tròn
var arrPieLabel = [];
var arrPieData = [];
//End dữ liệu biểu đồ tròn
//Dữ liệu biểu đồ view
var arrViewLabel = [];
var arrViewData = [];
//End dữ liệu biểu đồ view
//Dữ liệu biểu đồ Doanh thu
var arrRevenueLabel = [];
var arrRevenueData = [];
//End dữ liệu biểu đồ Doanh thu
//Dữ liệu biểu đồ cột top sản phẩm bán chạy
var arrBarlabel = [];
var arrBarData = [];
//End liệu biểu đồ cột top sản phẩm bán chạy

var base_url =
    location.protocol + "//" + document.domain + ":" + location.port;
$.post(
    base_url + "/admin/index/report",
    {},
    function (data) {
        //Parse json
        var jsonData = JSON.parse(data);

        jsonData.arrStruct.forEach(struct => {
            arrPieLabel.push(struct.NAME);
            arrPieData.push(struct.SUM);
        });

        jsonData.arrView.forEach(view=>{
            arrViewLabel.push(view.DATE);
            arrViewData.push(view.VIEW);
        })

        jsonData.arrMoney.forEach(money=>{
            arrRevenueLabel.push(money.DATE);
            arrRevenueData.push(money.TOTALMONEY);
        })

        jsonData.arrTop.forEach(top=>{
            arrBarlabel.push(top.NAME);
            arrBarData.push(top.SUM);
        })

        CreatePieChart(ctxPieChar, arrPieLabel, arrPieData);
        CreateLineChart(ctxLineViewChart, arrViewLabel, arrViewData, 'Lượt xem');
        CreateLineChart(ctxLineRevenueChart, arrRevenueLabel, arrRevenueData, 'Doanh thu');
        CreateBarChart(ctxBarChar, arrBarlabel, arrBarData);
    }
);

//End biểu đồ cột
//Tạo dữ liệu giả
// for (var i = 1; i < 31; i++) {
//     arrRevenueLabel[i] = i;
//     arrRevenueData[i] = Math.floor((Math.random() * 5000000) + 100000);
// }



function CreatePieChart(context, arrLabel, arrData) {
    var accessTimesLineChart = new Chart(context, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            //dữ liệu trên trục x truyền vào là một mảng
            labels: arrLabel,

            datasets: [{
                //Cấu hình hiển thị cho biểu đồ
                label: 'Lượt mua',
                backgroundColor: ['#e74c3c', '#2980b9', '#568a28', '#f1c40f'],
                borderColor: '#fff',
                borderWidth: 1,
                weight: 20,
                //Cấu hình hiển thị lúc hover vào điểm

                //Dữ liệu truyền vào, truyền vào một mảng
                data: arrData
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    stacked: true,

                }]
            }
        }
    });
}

function CreateBarChart(context, arrLabel, arrData) {
    //Truyền Biến trên vào trong context
    var accessTimesLineChart = new Chart(context, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            //dữ liệu trên trục x truyền vào là một mảng
            labels: arrLabel,

            datasets: [{
                //Cấu hình hiển thị cho biểu đồ
                label: 'Lượt mua',
                backgroundColor: 'rgba(86, 138, 40, 1)',
                borderColor: 'rgba(153, 204, 0, 1)',
                borderWidth: 2,
                borderSkipped: true,


                //Cấu hình hiển thị lúc hover vào điểm


                //Dữ liệu truyền vào, truyền vào một mảng
                data: arrData
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    stacked: true,

                }]
            }
        }
    });
}

//Hàm tạo biểu đồ đường thằng
function CreateLineChart(context, arrLabel, arrData, stringLabel) {
    //Truyền Biến trên vào trong context
    var accessTimesLineChart = new Chart(context, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            //dữ liệu trên trục x truyền vào là một mảng
            labels: arrLabel,

            datasets: [{
                //Cấu hình hiển thị cho biểu đồ
                label: stringLabel,
                fill: false,
                backgroundColor: 'rgba(86, 138, 40, 1)',
                borderColor: 'rgba(153, 204, 0, 1)',
                pointBorderWidth: 2,
                lineTension: 0.1,
                spanGaps: false,
                steppedLine: false,

                //Cấu hình hiển thị lúc hover vào điểm
                pointHoverRadius: 8,
                pointHoverBorderColor: 'rgba(220, 220, 220,1)',
                pointHoverBorderWidth: 2,

                //Dữ liệu truyền vào, truyền vào một mảng
                data: arrData
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    stacked: true,
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}