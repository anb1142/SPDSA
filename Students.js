var AVLTree = /** @class */ (function () {
    function AVLTree() {
        this.root = null;
    }
    AVLTree.prototype.getHeight = function (node) {
        return node ? node.height : 0;
    };
    AVLTree.prototype.updateHeight = function (node) {
        node.height =
            1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
    };
    AVLTree.prototype.getBalanceFactor = function (node) {
        return this.getHeight(node.left) - this.getHeight(node.right);
    };
    AVLTree.prototype.insert = function (key) {
        this.root = this.insertData(this.root, key);
    };
    AVLTree.prototype.insertData = function (node, key) {
        if (!node)
            return new AVLNode(key);
        if (key < node.marks) {
            node.left = this.insertData(node.left, key);
        }
        else if (key > node.marks) {
            node.right = this.insertData(node.right, key);
        }
        else {
            return node;
        }
        this.updateHeight(node);
        var balance = this.getBalanceFactor(node);
        if (balance > 1) {
            var select = node.left;
            if (key < select.marks) {
                return this.rightRotate(node);
            }
            node.left = this.leftRotate(node.left);
            return this.rightRotate(node);
        }
        if (balance < -1) {
            var select = node.left;
            if (key > select.marks) {
                return this.leftRotate(node);
            }
            node.right = this.rightRotate(node.left);
            return this.leftRotate(node);
        }
        return node;
    };
    AVLTree.prototype.rightRotate = function (node) {
        var x = node.left;
        var T2 = x.right;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    };
    AVLTree.prototype.leftRotate = function (node) {
        var x = node.right;
        var T2 = x.left;
        x.right = node;
        node.left = T2;
        this.updateHeight(node);
        this.updateHeight(x);
        return x;
    };
    AVLTree.prototype.inOrderTraversal = function (node) {
        if (node === void 0) { node = this.root; }
        if (node) {
            this.inOrderTraversal(node.left);
            console.log(node.marks);
            this.inOrderTraversal(node.right);
        }
    };
    AVLTree.prototype.search = function (marks, node) {
        if (node === void 0) { node = this.root; }
        var found = false;
        if (node) {
            if (node.marks === marks)
                found = true;
            if (found)
                return found;
            found = !found ? this.search(marks, node.left) : true;
            found = !found ? this.search(marks, node.right) : true;
        }
        return found;
    };
    AVLTree.prototype.count = function (node) {
        if (node === void 0) { node = this.root; }
        var c = 0;
        if (node) {
            c++;
            c += this.count(node.left);
            c += this.count(node.right);
        }
        return c;
    };
    AVLTree.prototype.delete = function (marks, parent, node) {
        if (parent === void 0) { parent = null; }
        if (node === void 0) { node = this.root; }
        if (node) {
            if (node.marks === marks) {
                if (parent) {
                    parent.right = null;
                }
                return;
            }
            this.delete(marks, node, node.left);
            this.delete(marks, node, node.right);
            if (node.marks === marks) {
                if (parent) {
                    parent.left = null;
                }
                return;
            }
        }
    };
    return AVLTree;
}());
var AVLNode = /** @class */ (function () {
    function AVLNode(key) {
        this.marks = key;
        this.left = null;
        this.right = null;
        this.height = 1;
    }
    return AVLNode;
}());
var students = new AVLTree();
students.insert(12);
students.insert(5);
students.insert(48);
students.insert(4);
students.delete(48);
var c = students.count();
console.log(c);
console.log(students);
