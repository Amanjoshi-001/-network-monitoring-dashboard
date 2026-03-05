let chart;

async function getStats(){

    const response = await fetch('/stats');
    const data = await response.json();

    document.getElementById("connectivity").innerText = data.connectivity;
    document.getElementById("bandwidth").innerText = data.bandwidth;
    document.getElementById("latency").innerText = data.latency;

    if(data.connectivity === 100){
        document.getElementById("status").innerText="ONLINE";
        document.getElementById("status").style.color="lime";
    }else{
        document.getElementById("status").innerText="OFFLINE";
        document.getElementById("status").style.color="red";
    }

    updateChart(data);
}


function updateChart(data){

    const ctx = document.getElementById('networkChart').getContext('2d');

    if(!chart){

        chart = new Chart(ctx,{
            type:'line',
            data:{
                labels:[],
                datasets:[{
                    label:'Bandwidth KB/s',
                    data:[],
                    borderColor:'cyan',
                    fill:false
                }]
            },
            options:{
                scales:{
                    y:{
                        beginAtZero:true
                    }
                }
            }
        });

    }

    chart.data.labels.push(new Date().toLocaleTimeString());
    chart.data.datasets[0].data.push(data.bandwidth);

    if(chart.data.labels.length > 20){
        chart.data.labels.shift();
        chart.data.datasets[0].data.shift();
    }

    chart.update();
}

getStats();
setInterval(getStats,2000);
