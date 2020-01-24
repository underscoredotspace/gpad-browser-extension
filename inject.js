var pathParts = document.location.href.split("/")
var username = pathParts[pathParts.length - 2]

var token = document.cookie
    .split(";")
    .map(kv => kv.trim().split("="))
    .filter(t => t[0] == "BearerToken")[0][1]

chrome.runtime.sendMessage({ token, username }, response => {
    const account = response.accounts.find(
        account => account.rockstarAccount.displayName === username
    )

    const gta5 = account.rockstarAccount.gamesOwned.find(
        game => game.name === "GTAV"
    )

    document.addEventListener("DOMContentLoaded", () => {
        let gta5Element

        const interval = setInterval(() => {
            gta5Element = [
                ...document
                    .querySelector('[data-ui-name="GTAV"]')
                    .querySelectorAll("span")
            ].find(el => el.innerText.includes("Last Played"))

            if (gta5Element) {
                clearInterval(interval)
                const lastPlayed = new Date(gta5.lastSeen)
                gta5Element.textContent = `Last Played: ${lastPlayed}`
            }
        }, 1000)
    })
})
