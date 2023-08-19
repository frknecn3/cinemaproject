const container = document.querySelector('.container')

const infoText = document.querySelector('.infoText')

const movie = document.getElementById('movie')

const seats=document.querySelectorAll('.seat:not(.reserved)')

const movieImage = document.querySelector('#movieImage')

const getSeatsDataFromDatabase=()=>{
    const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'))
    if(dbSelectedMovie){
 movie.selectedIndex=dbSelectedMovie}

 const dbSelectedSeats=JSON.parse(localStorage.getItem('selectedIndexes'))

 if(dbSelectedSeats!==null&& dbSelectedSeats.length>0){


    seats.forEach((seat,index)=>{
        if(dbSelectedSeats.indexOf(index)>-1){
            seat.classList.add('selected')
        }else{}
    })



 }
}


const saveToDatabase=(seatIndexData)=>{
    // localstorage.setItem(key,value) komutu veri ekler, key ve value ister
    // localstorage.getItem(key) hangi veriyi getireceğini sorup veri getirir.
    // verileri JSON formatında kaydeder.

    localStorage.setItem('selectedIndexes',JSON.stringify(seatIndexData))
    localStorage.setItem('movieIndex',JSON.stringify(movie.selectedIndex))

    
}
const calculateTotalCost=()=>{

    // Veritabanı İşlemleri

    // 1. adım => Seçilen koltukların bilgisi
    // 2. adım => Tüm koltukların index (sıra numarası) bilgisi
    // 3. adım => 


    const selectedSeats = container.querySelectorAll('.seat.selected')

    const allSeatsArray = []
    const allSelectedSeatsArray = []


    seats.forEach((seat)=>{
        allSeatsArray.push(seat)
    })

    selectedSeats.forEach((selectedSeat)=>{
        allSelectedSeatsArray.push(selectedSeat)
    })


    let selectedIndexes=allSelectedSeatsArray.map((allSelectedSeat)=>{
        return allSeatsArray.indexOf(allSelectedSeat)
    })







    let selectedSeatsCount=container.querySelectorAll('.seat.selected').length

    if(selectedSeatsCount>0&& movie.selectedIndex>1){
        infoText.style.display='block'
    }
    else{infoText.style.display='none'}


    let price = movie.value

    let total = price*selectedSeatsCount

    infoText.innerHTML=`The price for <span id="seatCount">${selectedSeatsCount}</span> tickets is <span id="total">${total}$</span>`
    saveToDatabase(selectedIndexes)
}

getSeatsDataFromDatabase()
calculateTotalCost()

container.addEventListener('click',(mouseEvent)=>{
    // tıklanan elemanın mouse eventta nereye denk geldiğini bulduk
    //console.log(mouseEvent.target.offsetParent)
    

    //1-tıklanılan elemanın classlisti seat elemanı içerip reserved içermeyecek
    //2- yukarıdaki aşamayı sağlayacak sorgu oluşturulacak
    //3-sorgunun olumlu sonuçlanması halinde gelen eleman bizim boş koltuğumuz olur
    //4-toggle ile ekle "selected" elemanı ekle çıkar yapılacak.

    if(mouseEvent.target.offsetParent.classList.contains("seat")&&
    !mouseEvent.target.offsetParent.classList.contains("reserved"))
    {
        // tıklanılan elemente selected classını ver

        mouseEvent.target.offsetParent.classList.toggle('selected')
    }
    calculateTotalCost()
})


movie.addEventListener('change',()=>{
    
    if(movie.selectedIndex>1)
    {
    movieImage.src=`assets/images/${movie.selectedIndex}.jpg`
    }
    calculateTotalCost()
})