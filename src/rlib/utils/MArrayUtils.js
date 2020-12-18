class MArrayUtils {
    contains(arr, obj) {
        return (arr.indexOf(obj) > -1);
    }

    /**
     * 按照 key-value 相等的条件，在 dest 中逐一匹配 src 中的字典对象，并将src中字典对象的键值对，更新到dest匹配的对象中
     * 如果没有匹配的，就将该源对象插入到 dest 的首位
     * e.g.: 
     *  a = {a1: 1, a2: 'rer', a3: null}
     *  b = {a2: 'aaa', a3: 11, b1: 'b1', b2: 222}
     *  用b更新a后：
     *  a：{a1: 1, a2: 'aaa', a3: 11, b1: 'b1', b2: 222}
     * @param {Array} dest 待更新的目标，多个字典的数组
     * @param {Array} src 含更新数据的源，多个字典的数组
     * @param {string} key 字典中需匹配的键
     */
    update(dest, src, key) {
        for (let obj of src) {
            this.updateOne(dest, obj, key);
        }
    }

    /**
     * 按照 key-value 相等的条件，在 dest 中查找跟 obj 匹配的字典对象，并对其更新。参考 MArrayUtils.update 接口说明
     * @param {*} dest 待更新的目标，多个字典的数组
     * @param {*} obj 源数据，字典对象
     * @param {*} key 字典中需匹配的键
     */
    updateOne(dest, obj, key) {
        if (!obj.hasOwnProperty(key))
            return;
        let found = false;
        for (let index in dest) {
            let destItem = dest[index];
            if (!destItem.hasOwnProperty(key))
                return;
            if (destItem[key] === obj[key]) {
                // 在数组中找到匹配的元素，用新对象替换该元素
                dest[index] = {...destItem, ...obj};
                found = true;
                break;
            }
                
        }
        if (!found) {
            // 数组中没有找到匹配的元素，则在数组开头添加该对象
            dest.unshift(obj);
        }
    }

    find(arr, key, value) {
        for (let item of arr) {
            if (item[key] === value) {
                return item;
            }
        }
        return null;
    }
}

export default new MArrayUtils();
