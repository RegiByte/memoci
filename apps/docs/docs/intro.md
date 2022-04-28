---
sidebar_position: 1
---

# Tutorial Intro

Graphix is a library for creating **graph-based** data interaction pipelines, and it also has a nice **visual editor**.

The purpose of graphix is to provide a semi-friendly visual environment to give non-coders the ability to operate any
kind of customizable flows using dedicated nodes that transforms and generates data, it can also be an easy way to
abstract behavior and store it as json documents.

That being said, graphix is split into two libraries, graphix-runtime and graphix-editor, runtimes are special classes
that know how to traverse and validate the graphs and generate useful data.

:::tip

🔎 **You don't need the graphix-editor if you're only executing graphs you already have.**

:::

## What it is ✅

- A low-level graph-based execution toolkit
- An abstract solution to solve common and repetitive coding problems
- A way to separate logic from the execution environment (language, browser, server...)
- A building blocks toolkit for integrating existing codebases with graph-based interations
- A way to store logic (like in a database) and execute it by providing the required inputs
- Lazy syntax sugar for code 🤓

## What it is not ❌

- A fully fledged plug-n-play solution
- A framework for building entire applications
- A framework-specific library

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 14 or above:
    - When installing Node.js, you are recommended to check all checkboxes related to dependencies.
- Basic understanding of [Graph theory](./graph-theory.md)

:::tip Trivia 🤓

Graphix was inspired by other graph-based visual editors like **unreal blueprints** and **blender nodes**, they are both
great examples of visual coding environments that worked out very well to non-coding users like designers and artists.

They accomplished it by providing the **right tools** and **documentation** to educate their users into efficiently
using their tools and handling all the underlying complexity themselves, and **you can too!**.

:::

## Before getting started
Our visual editor is created with the idea that you only provide your users with the nodes that they need for the context where the graph is being edited, which makes it well suited for creating applications where intermediary users can configure the behavior of certain entities and flows using pre-fabricated nodes.

To effectively use Graphix you need to have a basic understanding of the following:

- How to create a graph
- How to add nodes to the graph
- How to connect nodes together
- How to run the graph
- How to create a runtime
- How to add resolvers to a runtime

## Install

If you're just testing the library you can use just the standard runtime.

You can install it by executing one of the following on your project root folder.

```bash

npm i graphix-runtime@latest

pnpm add graphix-runtime@latest # Using pnpm

yarn add graphix-runtime@latest # Using yarn

```

## Using standard graphs and schemas

Graphix exports a collection of example **graphs** and **schemas** that can be composed together and used for a variety
of common operations, you can also use the standard schemas as a basis for **your own schema**, you just have to extend
the standard schemas interfaces.

### Using graphs

```typescript
import { graphs, createRuntime } from 'graphix-runtime'

const runtime = createRuntime()

runtime.graph(graphs.fetchHackerNews).execute({
  query: 'New spicy js frameworks',
  limit: Infinity
}).then(console.log)

runtime.graph(graphs.fetchRepositoryStats).execute({
  author: 'RegiByte',
  repo: 'memoci'
}).then(console.log)

```

### Abstracting complex behavior with pipelines

:::info Something to keep in mind about pipelines

The graphs used to compose a graph pipeline generate separate results, that way you can reference the result of a
previous graph execution on any of the following graphs, and it can of course influence the behavior of such graphs, we
tried our best to validate and prevent common caveats but please don't try anything funky yet 😅

:::

```typescript
import { graphs, createRuntime } from 'graphix-runtime'

const runtime = createRuntime()

async function generateReport({ title = 'another-mont-another-dolar', month = 'april', emailList }) {
  // Configure the pipeline graphs
  let pipeline = runtime.pipeline().graphs([
    // results in { dbResults: [...] }
    graphs.fetchDataFromDB,
    // references dbResults, results in { csvData: "col1,col2,col3..." }
    graphs.transformDataToCSV,
    // references csvData
    // results in { fileUrl: "https://corporate.work/reports/another-month-another-dolar-april.csv" }
    graphs.storeCSV,
    // results in { success: ["email1", "email2"], failed: ["email3"] }
    graphs.sendEmails,
  ])

  // execute the graph by providing sufficient inputs
  // for your graphs to run.
  const pipelineResult = await pipeline.execute({
    databaseUrl: 'mongo://your.cluster/db',
    csvColumns: ['col1', 'col2', 'col2'],
    csvSeparator: ';',
    csvFilename: `${title}-${month}.csv`,
    fileStorageProvider: 'https://your.fs.storage',
    fileStorageApiKey: 'super-secret-api-key',
    emailRecipients: emailList,
  })

  const {
    dbResults,
    csvData,
    success: succededEmails,
    failed: failedEmails,
    fileUrl
  } = pipelineResult.only([
    'fetchDataFromDB',
    'transformDataToCSV',
    'storeCSV',
    'sendEmails',
  ]).values()

  console.log({
    dbResults,
    csvData,
    fileUrl,
    succededEmails,
    failedEmails
  })
}

```