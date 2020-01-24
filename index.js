chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    console.log("request", request)
    const url = "https://scapi.rockstargames.com/profile/getprofile?nickname="

    const myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + request.token)
    myHeaders.append("X-Requested-With", "XMLHttpRequest")

    const myRequest = new Request(url + request.username, {
        method: "GET",
        headers: myHeaders,
        mode: "cors",
        cache: "default"
    })

    fetch(myRequest)
        .then(response => response.json())
        .then(json => {
            console.log(json)
            sendResponse(json)
        })
        .catch(err => sendResponse({ err }))

    return true
})
