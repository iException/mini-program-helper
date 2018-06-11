#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const log = require('../lib/log')
const inquirer = require('inquirer')
const commander = require('commander')

commander.arguments('<name>')
    .action(generatComponent)
    .parse(process.argv)

function generatComponent (name) {
    let dir = name

    new Promise((resolve, reject) => {
        if (!/\//.test(name)) {
            dir = `./components/${name}`
        } else {
            name = name.split('/').pop()
        }
        if (!fs.existsSync(dir)) {
            console.log('mkdir')
            fs.ensureDir(dir).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        } else {
            reject(new Error(`组件 ${name} 已经存在`))
        }
    }).then(res => {
        return Promise.all([
            fs.outputFile(`${dir}/${name}.js`, componentJsContent),
            fs.outputFile(`${dir}/${name}.json`, componentJsonContent),
            fs.outputFile(`${dir}/${name}.wxml`, componentWxmlContent),
            fs.outputFile(`${dir}/${name}.wxss`, componentWxssContent)
        ])
    }).then(res => {
        log.success(`组件 ${name} 创建成功 ${dir}/`)
    }).catch(err => {
        console.log(err)
    })
}

const componentJsContent = `Component({
    properties: {},
})`

const componentJsonContent = `{
    "component": true
}`

const componentWxmlContent = ``

const componentWxssContent = ``