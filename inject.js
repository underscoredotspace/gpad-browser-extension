function match(str, regex) {
    const didMatch = str.match(regex)
    return didMatch ? didMatch[1] : null
}

const username = match(document.location.href, /member\/(.+?)\//)
const token = match(document.cookie, /BearerToken=(.+?);/)

chrome.runtime.sendMessage({ token, username }, response => {
    const account = response.accounts.find(
        account => account.rockstarAccount.displayName === username
    )

    if (!account) {
        return
    }

    const gta5 = account.rockstarAccount.gamesOwned.find(
        game => game.name === "GTAV"
    )

    if (!gta5) {
        return
    }

    const lastPlayed = new Date(gta5.lastSeen).toString().substr(0, 16)
    const lastPlayedString = `Last Played: ${lastPlayed}`

    console.log(lastPlayedString)

    let gta5Element

    const interval = setInterval(() => {
        const container = document.querySelector('[data-ui-name="GTAV"]')

        if (!container) {
            return
        }

        gta5Element = [...container.querySelectorAll("span")].find(el =>
            el.innerText.includes("Last Played")
        )

        if (gta5Element) {
            clearInterval(interval)
            gta5Element.textContent = lastPlayedString
        }
    }, 50)
})
