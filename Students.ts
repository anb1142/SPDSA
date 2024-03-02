class AVLTree {
	public root: AVLNode | null;
	constructor() {
		this.root = null;
	}
	private getHeight(node: AVLNode | null): number {
		return node ? node.height : 0;
	}
	private updateHeight(node: AVLNode): void {
		node.height =
			1 + Math.max(this.getHeight(node.left), this.getHeight(node.left));
	}
	private getBalanceFactor(node: AVLNode): number {
		return this.getHeight(node.left) - this.getHeight(node.right);
	}
	public insert(key: number): void {
		this.root = this.insertData(this.root, key);
	}
	private insertData(node: AVLNode | null, key: number): AVLNode {
		if (!node) return new AVLNode(key);
		if (key < node.marks) {
			node.left = this.insertData(node.left, key);
		} else if (key > node.marks) {
			node.right = this.insertData(node.right, key);
		} else {
			return node;
		}
		this.updateHeight(node);

		const balance: number = this.getBalanceFactor(node);
		if (balance > 1) {
			const select = node.left as AVLNode;
			if (key < select.marks) {
				return this.rightRotate(node);
			}
			node.left = this.leftRotate(node.left as AVLNode);
			return this.rightRotate(node);
		}
		if (balance < -1) {
			const select = node.left as AVLNode;
			if (key > select.marks) {
				return this.leftRotate(node);
			}
			node.right = this.rightRotate(node.left as AVLNode);
			return this.leftRotate(node);
		}
		return node;
	}

	private rightRotate(node: AVLNode): AVLNode {
		const x: AVLNode = node.left as AVLNode;
		const T2 = x.right as AVLNode;
		x.right = node;
		node.left = T2;
		this.updateHeight(node);
		this.updateHeight(x);
		return x;
	}
	private leftRotate(node: AVLNode): AVLNode {
		const x: AVLNode = node.right as AVLNode;
		const T2 = x.left as AVLNode;
		x.right = node;
		node.left = T2;
		this.updateHeight(node);
		this.updateHeight(x);
		return x;
	}
	public inOrderTraversal(node: AVLNode | null = this.root): void {
		if (node) {
			this.inOrderTraversal(node.left);
			console.log(node.marks);
			this.inOrderTraversal(node.right);
		}
	}

	public search(marks: number, node: AVLNode | null = this.root): boolean {
		let found = false;
		if (node) {
			if (node.marks === marks) found = true;
			if (found) return found;
			found = !found ? this.search(marks, node.left) : true;
			found = !found ? this.search(marks, node.right) : true;
		}
		return found;
	}
	public count(node: AVLNode | null = this.root): number {
		let c = 0;
		if (node) {
			c++;
			c += this.count(node.left);
			c += this.count(node.right);
		}
		return c;
	}

	public delete(
		marks: number,
		parent: AVLNode | null = null,
		node: AVLNode | null = this.root
	): void {
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
	}
}
class AVLNode {
	marks: number;
	left: AVLNode | null;
	right: AVLNode | null;
	height: number;
	constructor(key: number) {
		this.marks = key;
		this.left = null;
		this.right = null;
		this.height = 1;
	}
}

const students = new AVLTree();
students.insert(12);
students.insert(5);
students.insert(48);
students.insert(4);
students.delete(48);
const c = students.count();
console.log(c);
console.log(students);

// Anuja Nimesh
// 137
