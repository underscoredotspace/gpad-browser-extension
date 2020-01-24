chrome.runtime.onMessage.addListener(
    ({ token, username }, _sender, sendResponse) => {
        if (!token || !username) {
            return false
        }

        const url = `https://scapi.rockstargames.com/profile/getprofile?nickname=${username}`

        const headers = new Headers()
        headers.append("Authorization", "Bearer " + token)
        headers.append("X-Requested-With", "XMLHttpRequest")

        fetch(new Request(url, { headers }))
            .then(response => response.json())
            .then(sendResponse)
            .catch(err => sendResponse({ err }))

        return true
    }
)
