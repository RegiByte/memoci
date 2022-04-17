import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react"
import { kebabCase, randomElement } from "memo-utils"
import { DateTime } from "luxon"
import { getConfigFile, getConfigFiles, saveConfigFile } from "../utils/paths"
import axios from "axios"

const newsApiKey = "6e97b8a15e434596822ea87700790a28"

interface FetchNewsParams {
	query: string
	date: string
	sortBy: string
	language?: string
}

export interface NewsArticle {
	title: string
	description: string
	author?: string
	url?: string
	content: string
	source?: {
		name?: string
	}
}

function getNews({ query, date, sortBy, language = "en" }: FetchNewsParams) {
	return axios.get(`https://newsapi.org/v2/everything`, {
		params: {
			q: query,
			from: date,
			sortBy: sortBy,
			apiKey: newsApiKey,
			language,
		},
	})
}

export default function useNews({
	query,
	date,
	language,
}: {
	query: string
	date: string
	language?: string
}) {
	const [news, setNewsState] = useState<NewsArticle[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const setNews = useCallback(
		(news => {
			if (typeof news === "function") {
				setNewsState(current => (news as any)(current))
				setLoading(false)
				return
			}

			setNewsState(news)
			setLoading(false)
		}) as Dispatch<SetStateAction<NewsArticle[]>>,
		[],
	)

	useEffect(() => {
		const hour = DateTime.now().toFormat("HH")
		const dateString = DateTime.fromFormat(date, "yyyy-LL-dd")
		const todayNewsFileName = `h${hour}-l-${language}-${kebabCase(query)}.json`
		let cachedNewsConfigPath = `cached/news`
		let todayNewsPath = `${cachedNewsConfigPath}/${date}`
		const fullConfigPath = `${todayNewsPath}/${todayNewsFileName}`

		getConfigFiles(todayNewsPath).then(async files => {
			const todayFileExists = files.find(file => file === todayNewsFileName)

			if (todayFileExists) {
				const todayNews = await getConfigFile(fullConfigPath)
				setNews(JSON.parse(todayNews)?.articles || [])
				return
			} else {
				let newsData
				try {
					const newsResponse = await getNews({
						query,
						date,
						sortBy: "popularity",
						language,
					})

					newsData = newsResponse.data
				} catch (e) {
					const randomNewsFileFromToday = randomElement(files)
					if (!randomNewsFileFromToday) {
						return
					}

					try {
						const randomNewsFromToday = await getConfigFile(
							`${todayNewsPath}/${randomNewsFileFromToday}`,
						)
						newsData = JSON.parse(randomNewsFromToday)
						setNews(newsData?.articles || [])
						return
					} catch (e) {
						console.log(
							"❌ there was an error while fetching an alternative news file",
						)
					}
				}

				try {
					await saveConfigFile(fullConfigPath, JSON.stringify(newsData))
					setNews(newsData?.articles || [])
				} catch (e) {
					console.log("❌ there was an error while saving news to fs")
					return
				}
			}
		})
	}, [])

	return {
		news,
		setNews,
		loading,
		setLoading,
	}
}
