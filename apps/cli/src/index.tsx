#!/usr/bin/env node
import { program } from "commander"
import { inspireCommand } from "./commands/inspire"
import { newsCommand } from "./commands/news"

const commands = [inspireCommand, newsCommand]

program
	.name("memoci")
	.description("memoci is a personal cli for managing memory-related stuff")
	.version("0.0.1")

commands.forEach(command => command(program))

program.parse()
