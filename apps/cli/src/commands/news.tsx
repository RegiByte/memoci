import { Command } from "commander"
import { DateTime } from "luxon"
import { Box, Newline, render, Text } from "ink"
import React, { useMemo } from "react"
import useNews, { NewsArticle } from "../hooks/useNews"
import Spinner from "ink-spinner"
import { capitalize, kebabCase, randomElement } from "memo-utils"
import { decode } from "html-entities"
import { getConfigFiles } from "../utils/paths"

interface NewsFlowPros {
	colorComponent: any
	query: string
	date: string
	language: string
	terminalLink: (title: string, url: string) => string
	content: boolean
}

function NewsFlow({
	colorComponent: Color,
	query,
	date,
	language,
	terminalLink,
	content
}: NewsFlowPros) {
	const { news, loading } = useNews({
		query,
		date,
		language
	})

	const selectedNews = useMemo(() => {
		if (!news.length) return []

		let items: Record<string, NewsArticle> = {}

		while (Object.keys(items).length < Math.min(10, news.length)) {
			const element = randomElement(news)
			const elementKey = kebabCase(element.title)
			if (!items[elementKey]) {
				items[elementKey] = element
			}
		}

		return Object.values(items)
	}, [news])

	if (!news.length && loading) {
		return (
			<Box
				justifyContent="space-around"
				padding={2}
				borderStyle="classic"
				borderColor="blue"
			>
				<Text>Fetching news</Text>
				<Spinner type="aesthetic" />
			</Box>
		)
	}

	if (!news.length && !loading) {
		return (
			<Box
				justifyContent="space-around"
				padding={2}
				borderStyle="classic"
				borderColor="blue"
			>
				<Text>No news found for this query: {query}</Text>
			</Box>
		)
	}

	return (
		<Box flexDirection="column">
			{selectedNews.map(currentNewspaper => {
				return (
					<Box flexDirection="column" key={currentNewspaper.title}>
						<Box padding={1} flexDirection="column">
							<Box
								borderStyle="round"
								borderColor="blue"
								flexDirection="column"
								padding={1}
							>
								<Color styles="bgBlue.white.underline">
									{currentNewspaper.title}
								</Color>
								<Newline />
								<Text>{decode(currentNewspaper.description)}</Text>
							</Box>
							<Box marginTop={1} flexDirection="row">
								<Text dimColor>Link: "{currentNewspaper.url}"</Text>
							</Box>
						</Box>
						<Box justifyContent="flex-end" marginTop={1}>
							<Box flexDirection="column" alignItems="flex-end">
								{currentNewspaper?.author && (
									<Text>
										By:{" "}
										<Color styles="bgWhite.black.underline">
											{currentNewspaper?.author}
										</Color>
									</Text>
								)}
								{currentNewspaper?.source?.name && (
									<Text>
										Source:{" "}
										<Color styles="bgGray.black.underline">
											{currentNewspaper.source.name}
										</Color>
									</Text>
								)}
							</Box>
						</Box>
					</Box>
				)
			})}
		</Box>
	)
}

export function newsCommand(program: Command) {
	program
		.command("news")
		.description(`Display news from multiple sources and dates.`)
		.option(
			"-q, --query <string>",
			"Optional search parameter for searching news",
			"tech"
		)
		.option(
			"-d, --date <string>",
			"Date parameter for searching news, defaults to today",
			DateTime.now().toISODate()
		)
		.option(
			"-l, --language <string>",
			"Two digit code for desired language, default en",
			"en"
		)
		.option("-c, --content", "Two digit code for history search", false)
		.action(async (params, options) => {
			const { query, date, language, content } = params

			const chalk = (await import("chalk")).default
			const terminalLink = (await import("terminal-link")).default

			if (!query || !date || !DateTime.fromFormat(date, "yyyy-LL-dd").isValid) {
				console.log(`❌ ${chalk.bgRed`wrong parameters provided`}\n`)
				options.help()
				return
			}

			const ColorComponent = (await import("ink-color-pipe")).default

			render(
				<NewsFlow
					content={content}
					query={query}
					language={language}
					date={date}
					terminalLink={terminalLink}
					colorComponent={ColorComponent}
				/>
			)
		})

	program
		.command("news:history")
		.description(`Display news search history`)
		.option(
			"-d, --date <string>",
			"Date parameter for fetching search history",
			DateTime.now().toISODate()
		)
		.option(
			"-l, --language <string>",
			"Two digit code for history search",
			"all"
		)
		.action(async (params, options) => {
			const { date, language } = params

			const chalk = (await import("chalk")).default
			const Color = (await import("ink-color-pipe")).default

			if (
				!date ||
				!language ||
				!DateTime.fromFormat(date, "yyyy-LL-dd").isValid
			) {
				console.log(`❌ ${chalk.bgRed`wrong parameters provided`}\n`)
				options.help()
			}

			try {
				const dateNews = await getConfigFiles(`cached/news/${date}`)

				if (!dateNews.length) {
					render(
						<Box
							borderStyle="classic"
							borderColor="blue"
							flexDirection="column"
							padding={1}
						>
							<Text>No news found for this date/lang combination</Text>
						</Box>
					)
					return
				}

				const mappedNews = dateNews.map(currentFile => {
					const [[h, ...hour], l, lang] = currentFile
						.slice(0, "h00-l-ln".length)
						.split("-")
					let fullHour = hour.join("")
					const search = capitalize(
						currentFile.slice("h00-l-ln-".length).replace(".json", "")
					)

					return {
						hour: fullHour,
						search,
						lang
					}
				})

				render(
					<Box borderStyle="classic" borderColor="blue" flexDirection="column">
						{mappedNews.map(currentNews => (
							<Box
								flexDirection="column"
								borderColor="cyan"
								borderStyle="round"
								key={`${currentNews.hour}-${currentNews.search}-${currentNews.lang}`}
							>
								<Box flexDirection="row" justifyContent="center">
									<Box flexGrow={1}>
										<Text>
											Search:{" "}
											<Color styles="bgCyan.white.underline">
												{currentNews.search}
											</Color>
										</Text>
									</Box>
									<Text>
										Hour:{" "}
										<Color styles="bgCyan.white.underline">
											{currentNews.hour}:00
										</Color>
									</Text>
									<Box marginLeft={1}>
										<Text>
											Lang:{" "}
											<Color styles="bgCyan.white.underline">
												{currentNews.lang}
											</Color>
										</Text>
									</Box>
								</Box>
							</Box>
						))}
					</Box>
				)
			} catch (e) {
				console.log(`❌ ${chalk.bgRed`failed to get news from date ${date}`}\n`)
				console.log(e)
			}
		})
}
