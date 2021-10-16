# 1. Intro, Hello World Java

## **Our First Java Program** 

Printing Hello World is as easy as:

```
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

##  **Key Syntax Features** 

Our first programs reveal several important syntax features of Java:

- All code lives inside a class.
- The code that is executed is inside a function, a.k.a. method, called `main`.
- Curly braces are used to denote the beginning and end of a section of code, e.g. a class or method declaration.
- Statements end with semi-colons.
- Variables have declared types, also called their “static type”.
- Variables must be declared before use.
- Functions must have a return type. If a function does not return anything, we use void,
- The compiler ensures type consistency. If types are inconsistent, the program will not compile.

##  **Static Typing** 

Static typing is (in my opinion) one of the best features of Java. It gives us a number of important advantages over languages without static typing:

- Types are checked before the program is even run, allowing developers to catch type errors with ease.
- If you write a program and distribute the compiled version, it is (mostly) guaranteed to be free of any type errors. This makes your code more reliable.
- Every variable, parameter, and function has a declared type, making it easier for a programmer to understand and reason about code.

There are downside of static typing, to be discussed later.

## **Coding Style**

Coding style is very important in 61B and the real world. Code should be appropriately commented as described in the textbook and lectures.

##  **Command line compilation and execution**

 `javac` is used to compile programs. `java` is used to execute programs. We must always compile before execution.

# 2. Defining and Using Classes

##  **Client Programs and Main Methods**

A Java program without a main method cannot be run using the `java` command. However, methods from one class can be invoked using the `main` method of another class. A java class that uses another class is called a client of that class.

##  **Class Declaration** 

Java classes can contain methods and/or variables. We say that such methods and variables are “members” of the calss. Members can be *instance* members or *static* members. Static members are declared with the `static` keyword. Instance members are any members without the `static` keyword.

##  **Class Instantiation**

 Instantiating a class is almost always done using the new keyword, e.g. `Dog d = new Dog()`. An instance of a class in Java is also called an `Object`.

##  **Dot Notation** 

We access members of a class using dot notation, e.g. `d.bark()`. Class members can be accessed from within the same class or from other classes.

##  **Constructors** 

Constructors tell Java what to do when a program tries to create an instance of a class, e.g. what it should do when it executes `Dog d = new Dog()`. 构造方法没有返回值。注意`new Dog()`返回的是所创建的对象所在的地址，该地址会被存储在变量`d`中。

##  **Array Instantiation** 

Arrays are also instantiated using the `new` keyword. If we have an array of Objects, e.g. `Dog[] dogarray`, then each element of the array must also be instantiated separately.

##  **Static vs. Instance methods** 

The distinction between static and instance methods is incredibly important. Instance methods are actions that can only be taken by an instance of the class (i.e. a specific object), whereas static methods are taken by the class itself. An instance method is invoked using a reference to a specific instance, e.g. `d.bark()`, whereas static methods should be invoked using the class name, e.g. `Math.sqrt()`. Know when to use each.

##  **Static variables** 

Variables can also be static. Static variables should be accessed using the class name, e.g. `Dog.binomen` as opposed to `d.binomen`. Technically Java allows you to access using a specific instance, but we strongly encourage you not to do this to avoid confusion.

##  **void methods** 

A method which does not return anything should be given a void return type.

##  **The `this` keyword** 

Inside a method, we can use the `this` keyword to refer to the current instance.

##  **public static void main(String[] args)** 

We now know what each of these things means:

- public: So far, all of our methods start with this keyword.
- static: It is a static method, not associated with any particular instance.
- void: It has no return type.
- main: This is the name of the method.
- String[] args: This is a parameter that is passed to the main method.

##  **Command Line Arguments** 

Arguments can be provided by the operating system to your program as “command line arguments,” and can be accessed using the `args` parameter in `main`. For example if we call our program from the command line like this `java ArgsDemo these are command line arguments`, then the `main` method of `ArgsDemo` will have an array containing the Strings “these”, “are”, “command”, “line”, and “arguments”.

##  **Using Libraries** 

There’s no need in the year 2017 to build everything yourself from scratch. In our course, you are allowed to and highly encouraged to use Java’s built-in libraries, as well as libraries that we provide, e.g. the Princeton standard library. You should not use libraries other than those provided or built into Java because it may render some of the assignments moot, and also our autograder won’t have access to these libraries and your code won’t work.

##  **Getting Help from the Internet** 

You’re welcome to seek help online. However, you should always cite your sources, and you should not seek help on specific homework problems or projects. For example, googling “how convert String Java” or “how read file Java” are fine, but you should not be searching “project 2 61b java berkeley”.

# 3. References, Recursion, and Lists

> Code from this lecture available at https://github.com/Agachily/lectureCode-sp18/tree/master/lists1.

> Summary: This course introduces how to define a basic single linked list by defining a data structure to store integers, namely IntLists.

##  **Bits**

The computer stores information as memory, and represents this information using sequences of bits, which are either 0 or 1.

##  **Primitives** 

Primitives are representations of information. There are 8 primitive types in Java: byte, short, int, long, float, double, boolean, and char. Each primitive is represented by a certain number of bits. For example, ints are 32 bit primitives, while bytes are 8 bit primitives.

##  **Declaring Primitives** 

When we declare a variable to be a primitive (i.e. `int x;`), we set aside enough memory space to hold the bits (in this case, 32). We can think of this as a box holding the bits. Java then maps the variable name to this box. Say we have a line of code `int y = x;` where `x` was defined before. Java will copy the bits inside the `x` box into the bits in the `y` box.

##  **Creating Objects** 

When we create an instance of a class using the `new` keyword, Java creates boxes of bits for each field, where the size of each box is defined by the type of each field. For example, if a Walrus object has an `int` variable and a `double` variable, then Java will allocate two boxes totaling 96 bits (32 + 64) to hold both variables. These will be set to a default value like 0. The constructor then comes in and fills in these bits to their appropriate values. The return value of the constructor will return the location in memory where the boxes live, usually an address of 64 bits. This address can then be stored in a variable with a “reference type.”

##  **Reference Types** 

If a variable is not a primitive type, then it is a reference type. When we declare object variables, we use reference type variables to store the location in memory of where an object is located. Remember this is what the constructor returns. A reference type is always a box of size 64 bits. Note that the variable does not store the entire object itself!

##  **Golden Rule of Equals** 

For primitives, the line `int y = x` copies the bits inside the `x` box into the `y` box. For reference types, we do the exact same thing. In the line `Walrus newWalrus = oldWalrus;`, we copy the 64 bit address in the `oldWalrus` box into the `newWalrus` box. So we can think of this golden rule of equals (GroE) as: when we assign a value with equals, we are just copying the bits from one memory box to another!

##  **Parameter Passing** 

Say we have a method `average(double a, double b)`. This method takes two doubles as parameters. Parameter passing also follows the GRoE, i.e. when we call this method and pass in two doubles, we copy the bits from those variables into the parameter variables.

##  **Array Instantiation** 

Arrays are also Objects, and are also instantiated using the `new` keyword. This means declaring an array variable (i.e. `int[] x;`) will create a 64-bit reference type variable that will hold the location of this array. Of course, right now, this box contains the value **null**, as we have not created the array yet. The `new` keyword for arrays will create the array and return the location of this array in memory. So by saying `int[] x = new int[]{0, 1, 2, 3, 4};`, we set the location of this newly created array to the variable x. Note that the size of the array was specified when the array was created, and cannot be changed!

##  **Null** 

The value of a reference type can be set to "null" to represent nothing is stored in it.

##  **IntLists** 

Using references, we recursively defined the `IntList` class. `IntLists` are lists of integers that can change size (unlike arrays), and store an arbitrarily large number of integers. 

`IntList` is composed by two parts, the first part stores the current value and second part points to the rest linked list.

<img src="./Pictures/pic6.png" style="zoom:67%;" >

Writing a `size` helper method can be done with either recursion or iteration. 

~~~java
public class IntList{
  public int first; // store the current value
  public IntList rest; // point to another IntList
  
  public IntList(int current, IntList rest)
  {
    this.first = current;
    this.rest = rest;
  }
}
~~~

##  **Is String a Reference Type in Java**

Question and answer are as follows:

<img src="./Pictures/pic1.png" style="zoom:33%;" >

<img src="./Pictures/Pic2.png" style="zoom:33%;" >

In fact if we say `s2 = "Bye"`, it should be `s2 = new String "Bye"`. It construct a new object and assign its address to s2, rather than changing the content of the origin address. That should be conducted by the *dot* systanx.

##  **Over-write `this`**.

<img src="./Pictures/Pic3.png" style="zoom: 60%;" >

`this` is a Java keyword that always pointing to the curent instance and it can not be reassigned.

## Futher undersanding of static

In a class, the static variables are shared by all instances of the class. and it should be accessed by the dot notation with the class, rather than instance. **Changing the static variables in one place will lead to the change in all other places, since they all pointing to the same address**

Static methods are methods that do not require an instance to call it, and thus do not access any instance variables.

You **can** call static attributes with an instance, but what will happen is Java will use the class to call the   static attributes.

# 4. SLLists, Nested Classes, Sentinel Nodes

> Code from this lecture available at https://github.com/Agachily/lectureCode-sp18/tree/master/lists2

> Summary: This part is about how to optimize the usage of previous talked linked list `IntList`  by adding a middle class IntNode.

## SLList (Single Linked List)

The previous `IntLIst` data structure is hard to use, so a new data structure `SLList` is created by adding a middle class `IntNode`. The philosophy of adding the `IntNode` class is letting every class to represent only one thing.The `IntNode` class is used to represent every sigle node in the linked list, and the `SLList` is used to represent the whole list.

~~~java
public class SLList {	
	private static class IntNode {
		public int item;
		public IntNode next;
		public IntNode(int i, IntNode n) {
			item = i;
			next = n;
			System.out.println(size);
		}
	} 
	/* The first item (if it exists) is at sentinel.next. */
	private IntNode sentinel;
	private int size;
	public SLList() {
		sentinel = new IntNode(63, null);
		size = 0;
	}
	public SLList(int x) {
		sentinel = new IntNode(63, null); // create a sentinel
		sentinel.next = new IntNode(x, null);
		size = 1;
	}
}
~~~

##  **Public vs. Private** 

We want users to modify our list via `SLList` methods only, and not by directly modifying `first`. We can prevent other users from doing so by setting our variable access to `private`. Writing `private IntNode first;` prevents code in other classes from accessing and modifying `first` (while the code inside the class can still do so).

##  **Nested Classes** 

We can also move classes into classes to make nested classes! You can also declare the nested classes to be private as well; this way, other classes can never use this nested class.

##  **Static Nested Classes** 

If the `IntNode` class never uses any variable or method of the `SLList` class, we can turn this class static by adding the “static” keyword. The `IntNode` class is defined in the `SLList` class as an embedded class.

##  **Recursive Helper Methods** 

If we want to write a recursive method in `SLList`, how would we go about doing that? After all, the `SLList` is not a naturally recursive data structure like the `IntNode`. A common idea is to write an outer method that users can call. This method calls a private helper method that takes `IntNode` as a parameter. This helper method will then perform the recursion, and return the answer back to the outer method.

##  **Caching** 

Previously, we calculated the size of our `IntList` recursively by returning 1 + the size of the rest of our list. This becomes really slow if our list becomes really big, and we repeatedly call our size method. Now that we have an `SLList`, lets simply cache the size of our list as an instance the variable `size`! Note that we could not do this before with out `IntList`.

##  **Empty Lists** 

With an`SLList`, we can now represent an empty list. We simply set `first` to `null` and `size` to `0`. However, we have introduced some bugs; namely, because `first` is now `null`, any method that tries to access a property of `first` (like `first.item`) will return a `NullPointerException`. Of course, we can fix this bug by writing code that handles this special case. But there may be many special cases. Is there a better solution?

##  **Sentinel Nodes** 

Lets make all `SLList` objects, even empty lists, the same. To do this, lets give each SLList a sentinel node, a node that is always there. Actual elements go after the sentinel node, and all of our methods should respect the idea that sentinel is always the first element in our list.

##  **Invariants**

An invariant is a fact about a data structure that is guaranteed to be true (assuming there are no bugs in your code). This gives us a convenient checklist every time we add a feature to our data structure. Users are also guaranteed certain properties that they trust will be maintained. For example, an `SLList` with a sentinel node has at least the following invariants:

- The sentinel reference always points to a sentinel node.
- The front item (if it exists), is always at `sentinel.next.item`.
- The size variable is always the total number of items that have been added.

# 5. DLLists, Arrays

> Code from this lecture available at https://github.com/Agachily/lectureCode-sp18/tree/master/lists3

> Summary: This part is about how to define doubly linked list (DLLists) and why we need to define that. Also about how to change to basic DLLists to a generic DLLists.

## Doubly Linked List

With the previous defined single linked list SLList, it is pretty time consuming to operate the last node. Like removing the last node, adding a new node before or after the last node. The reason is that the program has to go through the whole linked list to find the last node. We can partly solve this problem by defining a flag that pointing to the last node. Bu this can only simply the process of adding a new node before or after the last node. It is still pretty tedious to remove the last node since it requires the position of the second to last node.

The best way to solve the above issues is to define a doubly linked list, namely DLList. 

## The Construction of DLLists

It is clear that to define a DLList, we need to have another  pointer pointing to the previous node. But this is not enough, we also need to deal with the situation that the last node sometimes pointing to the head sentinel node and sometimes pointing to normal node, because we hope the DLLists will have uniform behaviour. Therefore, we have to deal with the last node. There are two ways to cope with that:

1. Add a second sentinel node to the back of the list.

   <img src="./Pictures/pic4.png">

2. Let the last node pointing to the beginning sentinel node and form a circle. This is recommended by Josh.

   <img src="./Pictures/pic5.png">

## Define Generic DLLists

In the previous parts, no matter the single linked list or the doubly linked list, the are both defined to hold single type data. This part is about how to define generic data structure that can hold various types of data.  Use the DLLists as example, we can change to class definition from:

`public class DLList{...}` to `public class DLList<T>{}`.

No the data store in the DLList is of type T. When use the DLList, we have to declare which type T refers to exactly, namely istead of using `DLList list = new DLList(10) `, we should use `DLList<String> list = new DLList<>("bone")`. Also, we need to use the reference version of the primitive type.(`Int -> Integer`)

# 6.  ALists, Resizing, vs. SLists

> Code from this lecture available at  https://github.com/Agachily/lectureCode-sp18/tree/master/lists4

> Summary: This part build a new data structure named AList (array list) with arrays to store data, with has similar function of linked list. But with different properties. And how to change the AList to a generic one.

## A Limitation of Linked List and Why We Need the Array List

Using linked list will be quiet time consuming to fetch the value of a single node for this process requires to go through the whole linked list until finding the desired position. However, using an array, we can fetch a single value with constant time, because the program can calculate the address directly with the provided index and then get the value from the address. So, this part we define a the AList with array.

~~~java
public class AList<Item> {
    private Item[] items;
    private int size;

    /** Creates an empty list. */
    public AList() {
        items = (Item[]) new Object[100];
        size = 0;
    }
} 
~~~

## The `removeLast` method

The `removsLast` method can be implemented by deceasing the index. If the AList does not store the reference type, we do not need to reset the deleted last position. If it is, we get to set to `null` to free the memory since Java only destroys objects when the last reference of it has been lost.

## Resizing Arrays, the Basic Way

One problem of Alist is that the size of an array should be decided once it has been initialized. So, if the array reaches its storage limitation and we want to add one more elements to it, we should resizing array. Array in fact is size fixed, therefore though we call the procedure as resizing arrays, in fact we define a new array with of size of `originalSize+1`, and copy the contents  of the original array to the new array with the array copying method. 

## Resizing Arrays, the Better Way

After the array reaching its limitation, every time we add one more element to it, the proccedures of creating a new array and coping should be went through. So we want to put huge number of elements like 10000 to a array with small initial length, the desired time will be horrible. 

To cope with this problem, we can grow the size of our array by a multiplicative amount, rather than adding a certain amount. That is changing from this:

~~~java
public void insertBack(int x) {
    if (size == items.length) {
           resize(size + RFACTOR);
    }
    items[size] = x;
    size += 1;
}
~~~

to this

~~~java
public void insertBack(int x) {
    if (size == items.length) {
           resize(size * RFACTOR);
    }
    items[size] = x;
    size += 1;
}
~~~

## Downsizing Array Size 

The `AList` is almost good, but not enough. Consider a special situation that we insert 100000 elements and remove  99% of them. So, huge memory has been allocated by only a small part of it has been truely utilized. To fix this, we should downsize the array when it begins to look empty. Specifically, we define a `usage ratio` R which is equal to the size of the list divided by the length of the `items` array. In a typical implementation, we `halve the size` of the array when R falls to less than 0.25.

## Copy Arrays

The method `System.arraycopy` can be used to copy arrays.

## Generic ALists

We can make AList to be generic as previous. Just with one thing to be noticed, that is we Java does not support generic, so instead of using `GenericType[] items = new GenericType[8];`, we get to use `GenericType[] items = (Generictype []) new Object[8];`. A warning may be yield, but just ingore it. 

In the example codes, name `Item` is used to refer to the generic type. 

# 7. Testing

> Code from this lecture available at https://github.com/Berkeley-CS61B/lectureCode-sp18/tree/master/testing

> Summary: This part is about how to use JUnit to test Java codes and introduce the idea of TDD, a.k.a Testing Driven Development.

## Using JUnit

JUnit is a tool for testing Java code, the main idea of JUnit is using the codes that need to be tested to produce a result and compare that with the expected result. To use the JUnit, there is something to do.

1. Define a class to contain the methods used for testing, and there is no need to define the main method.
2. Do `import org.junit.Test` and `import static org.junit.Assert`.
3. Add the annotation `@Test` above every single method. Also each test method should be non-static.
4. Use `asserEquals ` and other similar methods to compare the real and expected output. The `asserEquals` method can be used to judge whether the contents stored in the address are same.

## TDD

Test-Driven Development is recommended for developing. The whole idea is consisted of following procedures:

1. Indentify a new feature.
2. Write a unit test for that new feature.
3. Run test, and it should fail.
4. Write the right codes that can pass the test.
5. Refactor the codes.

Also, try to split a big funtion into several small and independent functions, which is better for development and maintenance.

# 8. Inheritance, Implements

> Code of this lecture is avaliable at https://github.com/Agachily/lectureCode-sp18/tree/master/inheritance1

> Summary: This part is mainly about the `interface` mechanism in Java 

## Methods Overloading

In a Java class, we can have some methods that hace same names but different parameters. When callilng the method, the complier will find the appropriate method with the provied parameters. This kind of mechanism is called overloading.

## Make Code General

For classes with similar behaviours like `AList` and `SLList`, we can define a **more abstractive reference type** named `List`. The `Alist` and `SLList` should have a `is-a` relationship to `List`. Therefore, we can simplify the codes by manipulating the `List`, instead of manipulating `AList` and `SLList` separately. 

## Interface and Use Interface

`Intherdace` is a mechanism to define the so-called a more abstractive type. We use the keyword `interface` to define am interface. Like:

```java
public interface List<Item> { ... }
```

Also, an interface should specify what a `List` should do, rather than how to do.

To use an interface, like to specify the relationship between `AList` and the interface `List`, we should use the keyword `implements`. Like:

```java
public AList<Item> implements List<Item> { ... }
```

Since we have specify the relationship between `AList` and `List`, now any palces that requires / uses  `List` , we can always use `AList`, Like:

~~~java
 List<String> someList = new SLList<String>();
~~~

**In summary, if A `is a` B, so anywhere B is required, we can freely use A.**

## Overriding

Overriding means a class re-writing the methods in the interface it implemented  or the super-class it extended. In this situation, we'd better add a `@Override` annotation.

## Default Methods

Also interface should not give the detailed implementation codes of method, there is still an exception that is `default methods`. Interface can add detaild codes to methods with the `default` keyword, like:

```
public AList<Item> implements List<Item> { ... }
```

And the interface should make sure the default methods works well for for any type of object that implements it.

## Static Type and Dynamic Type

Every variable in Java has a static type (complie time type). This is the type specified when the variable is declared, and is checked at compile time. Every variable also has a dynamic type (run time type); this type is specified when the variable is instantiated, and is checked at runtime. For the following code:

~~~java
List<String> someList = new SLList<String>();
~~~

`someList`'s static type is `List` and its dynamic type is `SLList`. After the code:

~~~java
List<String> someList = new AList<String>();
~~~

`someList`'s dynamic type will be `AList` .

## Dynamic Method Selection-Overriding

 The rule is, if we have a static type `X`, and a dynamic type `Y`, then if `Y` overrides the method from `X`, then on runtime, we use the method in `Y` instead.

## Dynamic Method Selection-Overloading

Dynamic method selection plays no role when it comes to overloaded methods. Consider the following piece of code, where `Fox extends Animal`.

```
1  Fox f = new Fox();
2  Animal a = f;
3  define(f);
4  define(a);
```

Let’s assume we have the following overloaded methods in the same class:

```
public static void define(Fox f) { ... }
public static void define(Animal a) { ... }
```

Line 3 will execute `define(Fox f)`, while line 4 will execute `define(Animal a)`. Dynamic method selection only applies when we **have overridden methods**. There is no overriding here, and therefore dynamic method selection does not apply.

# 9. Extends, Casting, Higher Order Funtions

> Code of this lecture is avaliable at https://github.com/Agachily/lectureCode-sp18/tree/master/inheritance2

> Summary: This part is about the inheritance between classes and how to use higher order funtions in  Java.

## Two Inheritance Mechnism

We can use the inheritance mechanism to abstract the properties from similar classes, which is helpful for simplify complexity and generic codes. Classes (subclass) can both inherit from interfaces and other classes (super-class), with slightly grammar diffference (Keyword `implements` for interface and keyword `extends` for class). Interface实际上一种特殊的class。

## The Super Keyword

Since the subclass will have some same attributes as the superclass. Therefore, we can call the attribuets of the superclass explicitly with the `super` keyword.

## What is Not Inherited by the Subclass

Only the superclass'c constructor will not be inherited by the subclass.

## Define the Subclass's Constructer

The first statment of the subclass's cunstructer should always be the call of its superclass's constructer. If the statement is not given explicitly, the non-parameter constructer of the superclass (`super()`) will be called impicitly. For example:

~~~java
public VengefulSLList() {
  deletedItems = new SLList<Item>();
}
~~~

is equvalent to:

~~~java
public VengefulSLList() {
  super();
  deletedItems = new SLList<Item>();
}
~~~

If the constructer with the parameter of the superclass is needed to be called, call it explicitly, otherwise the non-parameter constructer will be called implicitly.

## The `Is A` Relationship

When a class inherits from another, we know that it must have all the qualities of it. This means that `VengefulSLList` is a `SLList` because it has all the qualities of an `SLList`- it just has a few additional ones too.

## The Object Class

Every single class is a descedent of the Object classes which provides operations that every object should be able to do, some vital methods of which we need to notice are:

`Class getClass()`: 返回一个对象运行时的类class对象

`nt hashCode()`: 返回该对象的hash值

`boolean equals(Object obj)`: 比较两对象是否相等

`String toString()`: 返回该对象的字符串表示

`Object clone()`: 实现对象的复制

## Encapsulation and Abstraction

Encapsulation and abstraction are viatl methods to contend with complexity. And inheritance can breaks encapsulation.

## Revist Static Type and Casting

- In Java, every object has a static type (defined at compile-time) and a dynamic type (defined at run-time). Our code may rely on the fact that some variable may be a more specific type than the static type. For example if we had the below definitions:

  ```
  Poodle frank  = new Poodle("Frank", 5);
  Poodle frankJr = new Poodle("Frank Jr.", 15);
  ```

  This statement would be valid

  ```
  Dog largerDog = maxDog(frank, frankJr);
  ```

  But this one would not be

  ```
  Poodle largerPoodle = maxDog(frank, frankJr);
  ```

  The reason the former statement is valid is because the compilers knows for a fact that anything that is returned from a `maxDog` function call is a `Dog`. However, in the latter case, the compiler does not know for a fact that the return value of `maxDog` would result in a `Poodle` even though both `Dog` arguments are `Poodle`s.

  Instead of being happy with just having a generic `Dog`, we can be a bit risky and use a technique called casting. Casting allows us to force the static type of a variable, basically tricking the compiler into letting us force the static type of am expression. To make `largerPoodle` into a static type `Poodle` we will use the following:

  ```
  Poodle largerPoodle = (Poodle) maxDog(frank, frankJr);
  ```

  Note that we are not changing the actual dynamic type of maxDog- we are just telling the compiler what is coming out of maxDog will be a `Poodle`. This means that any reference to `largerPoodle` will have a static type of `Poodle` associated with it.

  Casting, while powerful is also quite dangerous. You need to ensure that what you are casting to can and will actually happen. There are a few rules that can be used:

  - You can always cast up (to a more generic version of a class) without fear of ruining anything because we know the more specific version is a version of the generic class. For example you can always cast a Poodle to a Dog because all Poodles are Dog’s.
  - You can also cast down (to a more specific version of a class) with caution as you need to make sure that, during runtime, nothing is passed in that violates your cast. For example, sometimes Dog’s are Poodle’s but not always.
  - Finally, you cannot ever cast to a class that is above or below the class being cast. For an example, you cannot cast a Dog to a Monkey because a Monkey is not in the direct lineage of a Dog- it is a child of animal so a bit more distant.

- If `SLList` is a subclass of `List`, and `SLList` has a speical method `xxx()` while `List` does not. The following statements are wrong:

  ~~~java
  List<Integer> list = new SLList<>();
  list.xxx();
  ~~~

  Alought list's dynamic type is `SLList` which has the `xxx()` method, but it is its static type that will be checked by the complier, and it doesn't have the method. Therefore, errors will occur.

## Inheritance Cheatsheet

`VengefulSLList extends SLList` means VengefulSLList "is-an" SLList, and inherits all of SLList's members:

- Variables, methods nested classes
- Not constructors Subclass constructors must invoke superclass constructor first. The `super` keyword can be used to invoke overridden superclass methods and constructors.

Invocation of overridden methods follows two simple rules:

- Compiler plays it safe and only allows us to do things according to the static type.
- For overridden methods (*not overloaded methods*), the actual method invoked is based on the dynamic type of the invoking expression.
- Can use casting to overrule compiler type checking.

## Higher Order Functions in Java

> It is a traditional way since before Java 8 memory boxes (variables) could not contain pointers to functions.

A higher is a function that treats other functions like data, for example, in Python, we can define a higher order function name `do_twice` as follows:

~~~python
def tenX(x):
    return 10*x

def do_twice(f, x):
    return f(f(x))
~~~

Before Java 8, Java can not do this because Java does support memory boxes that containing pointers to functions. We solve this issue with interface. First defines any function that takes in an integer and returns an integer - an `IntUnaryFunction`.

```java
public interface IntUnaryFunction {
    int apply(int x);
}
```

Write a class implementing the interface:

~~~java
public class TenX implements IntUnaryFunction {
    /* Returns ten times the argument. */
    public int apply(int x) {
        return 10 * x;
    }
}
~~~

Now we can use higher order function like python:

~~~java
public static int do_twice(IntUnaryFunction f, int x) {
    return f.apply(f.apply(x));
}
~~~

核心思想就是既然内存块不能够直接指向函数，那就构造一个对像来间接地调用该函数。

# 10. ! Subtype Polymorphism vs. HoFs 

> How to implement callback in Java with interface 

## The Polymorphism Mechanism

In Java the inhertance mechanism mkes it possible to design more **general** data structures and methods using the `polymotphism` mechanism. 

> In Java, polymorphism refers to how objects can have many forms or types. In object-oriented programming, polymorphism relates to how an object can be regarded as an instance of its own class , an instance of its superclass, an instance of its superclass's superclass and so on.

Since Java picks which method to call according the **dynamic method selection**, so we can write more general codes by utilizing this mechanism. For example, to print a string representation of the larger of two objects, using the higher order function should be:

~~~python
def print_larger(x, y, compare, stringify):
    if compare(x, y):
        return stringify(x)
    return stringify(y)
~~~

Using the `subtype polymorphism ` shoould be:

~~~python
def print_larger(x, y):
    if x.largerThan(y):
        return x.str()
    return y.str()
~~~

因为x和y可以是很多种不同类型的对象，在第一种方式中，处理不同类型的x, y由所传入的函数`compare`负责，通常是利用重载的机制，对不同类型的参数应用不同的逻辑。在第二种方式中，则由x, y本身负责，由于多态机制，x和y可以承载多种类型的对象，具体的比较逻辑则由x和y具体的类型而定 (dynamic method selection)。

## An Example of Using Polymorphism to Generalize Codes

比如我们想要写一个类，这个类可以接受一个任意类型的数组作为参数，并且返回这个数组中最大的元素。那么这个类应当以如下方式进行构建：

~~~java
public static Object max(Object[] items) {
    int maxDex = 0;
    for (int i = 0; i < items.length; i += 1) {
        if (items[i] > items[maxDex]) {
            maxDex = i;
        }
    }
    return items[maxDex];
}
~~~

但事实上这样的构建方式是有错误的，因为`>`是不能够对任意类型的对象进行比较的。那么我们就只能在各个类中构建其各自的比较方法。比如在`Dog`类中，我们构建一个一个方法来根据狗的体重来对狗进行排序，在`Apartemnt`类中来根据公寓的面积进行排序等。但这样做不仅很繁琐，而且代码的抽象和泛化层次很低。

为了解决这个问题，我们利用多态机制，首先定义一个接口，如下：

```java
public interface OurComparable {
    public int compareTo(Object o);
}
```

然后再让各个类实现该接口，并且在类中具体给出`compareTo()`的比较方式。这就等于我们在这些类上利用`OurComparable`接口又构建了一层抽象。既然这些类都实现了`OurComparable`接口，那么我们就可以用`OurComparable`来承载这些类。那么我们就可以写出类似开头的，抽象层次较高的`max()`函数：

~~~java
public static OurComparable max(OurComparable[] items) {
    int maxDex = 0;
    for (int i = 0; i < items.length; i += 1) {
        int cmp = items[i].compareTo(items[maxDex]);
        if (cmp > 0) {
            maxDex = i;
        }
    }
    return items[maxDex];
}
~~~

这样我们就可以对任何实现了该接口的类进行处理，而无序在各个类中单独定义`max()`函数，提高了代码的泛化和抽象能力。

## The `Comparable` Interface

上述代码仍然存在可以优化的地方，因为该接口是由我们自行定义的，所以主要有以下两个问题：

1. No existing classed implemented `OurComparable`
2. No existing classed use `OurComparable` (e.g. no built-in max function that uses OurComparable)

为了解决这个问题，我们可以使用已经在Java中被定义好的一个类似的接口`Comparable`.

~~~java
public interface Comparable<T>{
  public int compareTo(T obj);
}
~~~

## The Natural Order

Natural order is used to refer to the ordering implied in the `compareTo` method of a particular class.

## The `Comparator` Interface and Another Example

对于一个类，比如Dog类，如果除了按体重排序，还想实现按身高，年龄排序应当如何做？

如果使用Higher Order Function应当按如下方式构建：

~~~python
def print_larger(x, y, compare, stringify): 
  if compare(x, y):
  return stringify(x) return stringify(y)
~~~

按照所要比较的条件传入相应比较函数即可。在Java中，如果按照如上的方法解决，那么我们就需要构建多个compareTo方法来适应不同的比较条件，但是事实上compareTo方法只能够被定义一个。此时我们可以使用compare接口，在Dog类中构建一个实现了该接口的内部类：

~~~java
public class Dog implements Comparable<Dog> {
    ...
    public int compareTo(Dog uddaDog) {
        return this.size - uddaDog.size;
    }
    private static class NameComparator implements Comparator<Dog> {
        public int compare(Dog a, Dog b) {
          // 使用了String类中的compareTo方法来对狗的名字进行比较。
            return a.name.compareTo(b.name);
        }
    }
    public static Comparator<Dog> getNameComparator() {
        return new NameComparator();
    }
}
~~~

那么我们就可以构建类似如上的高阶函数代码：

~~~java
Comparator<Dog> cd = new Dog.NameComparator(); 
if (cd.compare(d1, d3) > 0) {
     d1.bark(); 
} else {
d3.bark();
~~~

## Summary: The Core Function of Interface

Java's interface mechanism provide us with the ability to make callbacks and generalize codes. 

Sometimes, a function needs the help of another function that might not have been written yet (e.g. `max` needs `compareTo`). A help function is the callback function (in the scenario, `compareTo`). In some languages, this is accomplished using explicit function passing; in Java, we wrap the needed function in an interface.

## The Difference Between `compareTo` and `compares`

`compareTo`: Compare itself with another object, and there is only not room for `compareTo` methods. `Comparator` should be used to define multiple ways to compare. Rules

>- Return -1 if `this` < o.
>- Return 0 if `this` equals o.
>- Return 1 if `this` > o.

`compares`: A third party that compares to objects. Rules:

>- Return negative number if o1 < o2.
>- Return 0 if o1 equals o2.
>- Return positive number if o1 > o2.
