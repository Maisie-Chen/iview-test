/**
 * 全局共享工具 部分功能参考 vuejs 与 ElementUI
 * https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 */
export const emptyObject = Object.freeze({})
export const isEmpty = val => val == null || !(Object.keys(val) || val).length
export function isObj(obj) {
  return obj !== null && typeof obj === 'object'
}
export function isUndef(v) {
  return v === undefined || v === null
}
export function isDef(val) {
  return val !== undefined && val !== null
}
export function isTrue(v) {
  return v === true
}
export function isFalse(v) {
  return v === false
}
/**
 * Check if value is primitive
 */
export function isPrimitive(value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
/**
 * Get the raw type string of a value e.g. [object Object]
 */
const _toString = Object.prototype.toString

export function toRawType(value) {
  return _toString.call(value).slice(8, -1)
}
// 首字符大写
export function toFirstUpperCase(v) {
  return v.substring(0, 1).toUpperCase() + v.substring(1)
}
// 深度克隆
export function deepClone(data) {
  const t = toRawType(data)
  let o
  if (t === 'Array') {
    o = []
  } else if (t === 'Object') {
    o = {}
  } else {
    return data
  }
  if (t === 'Array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepClone(data[i]))
    }
  } else if (t === 'Object') {
    for (const i in data) {
      o[i] = deepClone(data[i])
    }
  }
  return o
}
// html 转义字符 // https://lodash.com/docs#escape
export function escapeText(text) {
  // return text.replace(/[&<>"' ]/g, s => {
  //   const entityMap = {
  //     '&': '&amp;',
  //     '<': '&lt;',
  //     '>': '&gt;',
  //     '"': '&quot;',
  //     "'": '&#39;',
  //     ' ': '&nbsp;'
  //   }
  //   return entityMap[s]
  // })
  if (isEmpty(text)) return ''
  return text.replace(/[&<>"' \r\n]/g, s => {
    const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      ' ': '&nbsp;',
      '\r\n': '<br>',
      '\r': '<br>',
      '\n': '<br>'
    }
    return entityMap[s]
  })
}
// 文本换行
export function newLineText(text) {
  return text.replace(/\n|\r\n/g, '<br/>')
}
// 下载
export function downFile(fileData) {
  // 处理返回的文件流
  if (!fileData) {
    return false
  }
  const content = fileData.data
  const fileName = decodeURIComponent((fileData.headers['content-disposition'].split(';')[1]).split('=')[1])
  const blob = new Blob([content])
  if ('download' in document.createElement('a')) { // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else { // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
// 比较两个值是否相等
export function comparesTwoValues(oldVal, newVal) {
  if (oldVal === newVal) {
    return false
  } else {
    return true
  }
}

export function downFileInWindow(name, query = {}) {
  const baseUrl = process.env.VUE_APP_BASE_API
  const queryUrl = baseUrl + name
  // 传入api校验消息
  // Object.assign(query, {
  //   Authorization: 'Bearer ' + getToken()
  // })
  // 遍历url参数
  let params = ''
  // 第一个参数
  let firstParams = false
  Object.keys(query).forEach(v => {
    // 排除 undefined null 的数据
    if (isUndef(query[v])) return
    // 首个参数使用 ? 衔接
    if (!firstParams) {
      params += '?'
      firstParams = true
    } else params += '&'
    params += `${v}=${query[v]}`
  })
  window.open(queryUrl + params)
}

/**
     * @param {object}  object 目标对象
     * @param {Array}  picked  选中的对象属性
     * @description 筛选目标对象中所有存在的’选中的对象属性‘，返回一个新的已经过滤的对象
     * eg: const a = pickObject({a: 1, b: 2, c: 3}, ['a'])
     * console.log(a) // {a: 1}
     */
export const pickObject = (obj, picked) => {
  const newObject = {}
  picked.forEach((v) => {
    if (obj[v] !== undefined) {
      newObject[v] = obj[v]
    }
  })
  return newObject
}

/**
 * @param {Object} obj 对象
 * @param {Array} arr 要删除的对象属性名称数组
 * @description 删除对象内不需要的属性，返回一个新的对象
 */
export const omitObjectProps = (obj, arr) => {
  const objT = deepClone(obj)
  arr.forEach((v) => {
    delete objT[v]
  })
  return objT
}
/**
     * @param {*} val 值
     * @description 判断是否是对象
     */
export const isObject = (val) => {
  return Object.prototype.toString.call(val) === '[object Object]'
}
/**
   * @param {*} val 值
   * @description 判断是否是数组
   */
export const isArray = (val) => {
  return Object.prototype.toString.call(val) === '[object Array]'
}
/**
 * @param {object}  object 目标对象
 * @param {...object}  sources 来源对象
 * @description 递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。
 * 如果目标值存在，来源对象属性将覆盖目标对象属性。
 * 暂时只能支持对象与对象递归合并，对象与数组合并则会直接将数组值替换对象值。
 * 源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。
 */
export const merge = (obj, ...sources) => {
  const newObj = [obj, ...sources].reduce((total, ccurent) => {
    if (isEmpty(ccurent)) {
      return total
    }
    if (isEmpty(total)) {
      return ccurent
    }

    function finalCv(ccurentV, totalV) {
      const [totalVal, ccurentVal] = [totalV, ccurentV]
      for (const iterator in ccurentVal) {
        if (!isObject(totalVal[iterator]) && !isUndef(ccurentVal[iterator])) {
          totalVal[iterator] = ccurentVal[iterator]
        }
        if (isObject(totalVal[iterator]) && isObject(ccurentVal[iterator])) {
          Object.assign(totalVal[iterator], ccurentVal[iterator])
          finalCv(ccurentVal[iterator], totalVal[iterator])
        }
      }
      return totalVal
    }
    return finalCv(ccurent, total)
  })
  return newObj
}
