
//Pedimos las pelis

async function getMovies() {
    let url = await fetch("https://swapi.info/api/films");
    let data = await url.json();

    return data

}

function paintMovies(data) {
    try {
        let title = [];
        let year = []


        data.forEach(element => {
            title.push(element.title)
            year.push(new Date(element.release_date).getFullYear())

        });

        Chartist.lineChart(
            '#chart',
            {
                labels: title,
                series: [year]
            },
            {
                showArea: true,
                showLine: false,
                showPoint: false,
                axisX: { offset: 60 },
                axisY: { onlyInteger: true }
            }
        );
    }
    catch (error) {
        console.error("error al intentar", error);

    }

}

getMovies().then(datas => paintMovies(datas))


//------------------------------ EJERCICIO 2 ----------------------------------------------

async function getPeople() {
    let url = await fetch("https://swapi.info/api/people")
    let data = await url.json();

    let namePeople = []
    let numberMovies = []
    try {
        for (let i = 0; i < 10; i++) {
            namePeople.push(data[i].name)
            numberMovies.push(data[i].films.length)

        }

        Chartist.barChart(
            '#charti',
            {
                labels: namePeople,
                series: [numberMovies]
            },
            {
                axisY: { offset: 70, onlyInteger: true  },
                axisX: { offset: 60 }

            }
        );
    } catch (error) {
        console.error("error al intentar", error);

    }


}
getPeople()