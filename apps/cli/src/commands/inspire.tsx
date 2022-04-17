import { Command } from "commander"
import { Box, render, Text } from "ink"
import React, { useEffect, useState } from "react"
import { useQuotes } from "../hooks/useQuotes"
import { randomElement } from "memo-utils"

interface InspireFlowProps {
	colorComponent: any
}

function InspireFlow({ colorComponent: Color }: InspireFlowProps) {
	const { quotes } = useQuotes()
	const [selectedQuote, setSelectedQuote] = useState(null)

	useEffect(() => {
		if (quotes.length) {
			setSelectedQuote(randomElement(quotes))
		}
	}, [quotes])

	if (!selectedQuote) {
		return (
			<Box>
				<Text>Picking quote...</Text>
			</Box>
		)
	}

	const { q: quote, a: author } = selectedQuote
	return (
		<Box
			flexDirection="column"
			padding={2}
			borderStyle="classic"
			borderColor="blue"
		>
			<Text>{quote}</Text>
			<Box justifyContent="flex-end">
				<Color styles="bgWhite.cyan.underline">{author}.</Color>
			</Box>
		</Box>
	)
}

export function inspireCommand(program: Command) {
	program
		.command("inspire")
		.description("Display inspirational quotes fetched from the internet")
		.action(async (str, options) => {
			const ColorComponent = (await import("ink-color-pipe")).default

			render(<InspireFlow colorComponent={ColorComponent} />)
		})
}
