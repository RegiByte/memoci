import * as tjs from "ts-json-schema-generator"
import * as path from "path"
import { promises as fs } from "fs"

const project = require("../project.json")

const config = {
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "*",
  additionalProperties: true
}

async function run() {
  await Promise.all(
    project.scripts["schema:generate"].files.map(async (file: string) => {
      const schema = tjs
        .createGenerator({
          ...config,
          path: path.resolve(__dirname, "..", file)
        })
        .createSchema(config.type)

      await fs.writeFile(
        path.resolve(
          __dirname,
          "../schemas",
          path.basename(file).replace(".ts", ".json")
        ),
        JSON.stringify(schema, null, 2)
      )
    })
  )

  await fs.cp(path.resolve(__dirname, "../schemas"), path.resolve(__dirname, '../../docs/static/schemas'), {
    recursive: true
  })
}

run()
