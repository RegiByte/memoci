import path from "path"
import { promises as fs } from "fs"

export const kOsUser = process.env.USER
export const kConfigPath = path.resolve(`/home/${kOsUser}/.local/share/memoci`)

export const getFullConfigPath = (configPath: string) =>
	path.resolve(kConfigPath, configPath)

export const configFileExists = async (configFilePath: string) => {
	const fullPath = getFullConfigPath(configFilePath)

	try {
		await fs.stat(fullPath)
		return true
	} catch (e) {
		return false
	}
}

export const setupConfigPath = async (
	configPath: string,
	isFile: boolean = false,
) => {
	let fullPath = isFile
		? path.dirname(getFullConfigPath(configPath))
		: getFullConfigPath(configPath)

	try {
		await fs.stat(fullPath)
		return
	} catch (e) {
		await fs.mkdir(fullPath, {
			recursive: true,
		})
	}
}

export const getConfigFiles = async (configPath: string) => {
	await setupConfigPath(configPath)
	const fullPath = getFullConfigPath(configPath)

	return fs.readdir(fullPath)
}

export const saveConfigFile = async (configFilePath: string, content: any) => {
	await setupConfigPath(configFilePath, true)
	const fileExists = await configFileExists(configFilePath)

	if (fileExists) return

	const fullPath = getFullConfigPath(configFilePath)

	await fs.writeFile(fullPath, content)
}

export const getConfigFile = async (configFilePath: string) => {
	const fileExists = await configFileExists(configFilePath)

	if (!fileExists) return ""

	const fullPath = getFullConfigPath(configFilePath)
	return fs.readFile(fullPath, "utf-8")
}
