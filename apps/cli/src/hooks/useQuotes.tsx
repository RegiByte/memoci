import { useEffect, useState } from "react"
import { getConfigFile, getConfigFiles, saveConfigFile } from "../utils/paths"
import axios from "axios"
import { DateTime } from "luxon"
import { randomElement } from "memo-utils/dist"

export function useQuotes() {
	const [quotes, setQuotes] = useState([])

	useEffect(() => {
		const todayQuotes = `${DateTime.now().startOf("day").toISODate()}.json`

		getConfigFiles("cached/quotes").then(async files => {
			const sortedFiles = files.sort()
			/** If there are no files stored we fetch them all */
			if (!sortedFiles.length) {
				const response = await axios.get(
					"https://zenquotes.io/api/quotes/regibyte-memoci",
				)

				const { data } = response
				if (!Array.isArray(data)) {
					return
				}

				const filename = `cached/quotes/${todayQuotes}`

				try {
					await saveConfigFile(filename, JSON.stringify(data))
				} catch (e) {
					console.log("❌ there was an error while saving quotes to fs")
					return
				}
			}

			const todayQuotesFile = sortedFiles.find(file => file === todayQuotes)

			/** If we have already fetched the file for today */
			if (todayQuotesFile) {
				const todayQuotesJSON = await getConfigFile(
					`cached/quotes/${todayQuotesFile}`,
				)

				setQuotes(JSON.parse(todayQuotesJSON))
				return
			} else {
				console.log("fetching quotes...")

				/** If we don't have a json file for today quotes, we fetch them from the internet. */
				try {
					const response = await axios.get(
						"https://zenquotes.io/api/quotes/regibyte-memoci",
					)

					const { data } = response
					if (!Array.isArray(data)) {
						return
					}

					await saveConfigFile(
						`cached/quotes/${todayQuotes}`,
						JSON.stringify(data),
					)
					setQuotes(data)
				} catch (e) {
					/** If we fail to fetch todayQuotes from the internet, we use random quotes from a previous day*/

					const randomQuotesFile = randomElement(sortedFiles)
					const randomQuotesJSON = await getConfigFile(
						`cached/quotes/${randomQuotesFile}`,
					)

					setQuotes(JSON.parse(randomQuotesJSON))
				}
			}
		})
	}, [])

	return {
		quotes,
		setQuotes,
	}
}
