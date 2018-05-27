#!/usr/bin/env node
const path = require('path')
const fs = require('fs-extra')
const log = require('../lib/log')
const inquirer = require('inquirer')
const commander = require('commander')
const checkPath = require('../lib/checkPath')

commander.arguments('<name>')
    .action(generatPage)
    .parse(process.argv)

function generatPage (name) {
    let dir = name
    new Promise((resolve, reject) => {
        if (/\//.test(name)) {
            log.error('请输入正确的页面名称')
            process.exit(1)
        }
        dir = `./pages/${name}`

        if (!fs.existsSync(dir)) {
            console.log('mkdir')
            fs.ensureDir(dir).then(res => {
                resolve()
            }).catch(err => {
                reject(err)
            })
        } else {
            reject(new Error(`页面 ${name} 已经存在`))
        }
    }).then(res => {
        return Promise.all([
            fs.outputFile(`${dir}/${name}.js`, componentJsContent),
            fs.outputFile(`${dir}/${name}.json`, componentJsonContent),
            fs.outputFile(`${dir}/${name}.wxml`, componentWxmlContent),
            fs.outputFile(`${dir}/${name}.wxss`, componentWxssContent)
        ])
    }).then(res => {
        log.success(`页面 ${name} 创建成功 ${dir}/`)
    }).catch(err => {
        console.log(err)
    })
}

const componentJsContent = `Page({
    data: {},
    onLoad () {
        // TODO
    },
    onShow () {
        // TODO
    }
})`

const componentJsonContent = `{
    "usingComponents": {}
}`

const componentWxmlContent = `<view></view>`

const componentWxssContent = ``