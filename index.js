let currentPage = 1,totalPages = 10;
let dataLength,jsonData;
if(currentPage == 1){
    var req = new XMLHttpRequest()
    req.open('GET','https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json',true)
    req.send();
    req.onload = function(){
        jsonData = JSON.parse(this.responseText);
        dataLength = jsonData.length;
        loadPage();
    }

}

function createElementValue(element,value){
    var tag = document.createElement(element);
    tag.innerHTML = value;
    return tag
}

function createElement(element){
    var tag = document.createElement(element);
    return tag
}

function createButton(text,buttonDiv){
    button = document.createElement('button');
    button.innerHTML = text;
    button.setAttribute('type','button');
    button.className = 'btn btn-primary mr-3 ml-3';
    buttonDiv.appendChild(button);
    return button;
}

function loadNextPage(){
    currentPage++;
    loadPage();
}

function loadPreviousPage(){
    currentPage--;
    loadPage();
}

function loadPage(){
    document.body.innerHTML = ''; // clear all content on the page
    let data = jsonData.slice((currentPage-1)*10,Math.min(currentPage*10,dataLength));
    tableDiv = createElement('div');
    tableDiv.className = 'add-table-borders';
    
    table = createElement('table');
    table.className = 'table table-striped';
    
    thead = createElement('thead');
    thead.className = 'thead-dark'
    tr = createElement('tr');
    values = []
    values.push(createElementValue('th',"ID"));    
    values.push(createElementValue('th',"Name"));
    values.push(createElementValue('th',"Email"));
    values.forEach(element => {
        tr.append(element)
    });
    thead.append(tr);
    table.append(thead);

    tbody = createElement('tbody');
    data.forEach(element => {
        tr = createElement('tr');
        values = []
        values.push(createElementValue('td',element.id));
        values.push(createElementValue('td',element.name));
        values.push(createElementValue('td',element.email));
        values.forEach(element => {
            tr.append(element)
        });
        tbody.append(tr);
    });
    table.append(tbody);

    buttonDiv = createElement('div');
    buttonDiv.className = 'style-buttons';
    prevButton = createButton('Previous',buttonDiv);
    prevButton.addEventListener('click',loadPreviousPage);
    
    nextButton = createButton('Next',buttonDiv);
    nextButton.addEventListener('click',loadNextPage);
    if(currentPage == 1){
        prevButton.style.visibility = 'hidden';
    }
    else if(currentPage == totalPages){
        nextButton.style.visibility = 'hidden';
    }
    tableDiv.appendChild(table);
    // don't append the element to body if it's already inside a div
    //append the element to the div ann append the div instead
    document.body.append(tableDiv); 
    for(let pageNumber = 1; pageNumber <= totalPages; pageNumber++){
        button = createButton(pageNumber,buttonDiv);
        button.id = pageNumber;
        if(pageNumber == currentPage){
            button.className = 'btn btn-success btn btn-primary mr-3 ml-3';
        }
        button.addEventListener('click',function(){
            currentPage = pageNumber;
            loadPage();
        });
    }
    buttonDiv.appendChild(nextButton);
    document.body.append(buttonDiv);
    
    
}

