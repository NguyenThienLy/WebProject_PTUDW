
//Biểu đồ đường
//Biến lưu id get từ UI
var ctxLineChart = document.getElementById('accessTimesLineChart').getContext('2d');

//Tạo dữ liệu giả

var arrLabel = [];
var arrData =[];
for (var i = 1; i < 31; i++) {
    arrLabel[i] = i;
    arrData[i]=Math.floor((Math.random() * 100) + 1);
}

//End tạo dữ liệu giả

CreateLineChart(ctxLineChart,arrLabel,arrData,'Lượt xem');

//End biểu đồ đường

//Biểu đồ cột

var ctxBarChar = document.getElementById('TopProductBarChart').getContext('2d');

//Tạo dữ liệu giả
var arrBarlabel = ['Cà chua', 'Măng tươi', 'Sữa tươi', 'Đậu rang'];
var arrBarData = [10,20,50,10];
//End tạo dữ liệu ,giả

CreateBarChart(ctxBarChar,arrBarlabel,arrBarData);

//End biểu đồ cột

//Biểu đồ tròn

var ctxPieChar = document.getElementById('structureProductChart').getContext('2d');
var arrPieLabel = ['Nước uống','Rau sạch','Trái cây','Thịt'];
var arrPieData = [50,100,12,20];

CreatePieChart(ctxPieChar,arrPieLabel,arrPieData);
//End biểu đồ tròn

//Biểu đồ thể hiện doanh thu theo ngày

var ctxLineChart = document.getElementById('revenueLineChart').getContext('2d');

//Tạo dữ liệu giả

var arrLabel = [];
var arrData =[];
for (var i = 1; i < 31; i++) {
    arrLabel[i] = i;
    arrData[i]=Math.floor((Math.random() * 5000000) + 100000);
}

//End tạo dữ liệu giả

CreateLineChart(ctxLineChart,arrLabel,arrData,'Doanh thu');

//End biểu đồ thể hiện doanh thu theo ngày

function CreatePieChart(context,arrLabel,arrData){
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
                backgroundColor: ['#e74c3c','#2980b9','#568a28','#f1c40f'],
                borderColor: '#fff',
                borderWidth: 1,
                weight:20,
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

function CreateBarChart(context,arrLabel,arrData){
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
function CreateLineChart(context,arrLabel,arrData,stringLabel) {
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
                fill:false,
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
                    ticks:{
                            beginAtZero:true
                    }
                }]
            }
        }
    });
}