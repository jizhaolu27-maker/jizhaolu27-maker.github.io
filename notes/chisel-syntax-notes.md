# Chisel 语法笔记

## 1. Chisel 是什么

Chisel 是一种基于 Scala 的硬件构造语言，它不是传统意义上的独立 HDL，而是嵌入在 Scala 中，通过 Scala 语法生成硬件描述

常见关系：

- Scala：宿主语言
- Chisel：硬件构造语言
- FIRRTL：中间表示
- Verilog：常见输出形式

---

## 2. 基本结构

一个最基本的 Chisel 模块通常包含：

- 导入包
- 定义模块类
- 定义 IO
- 描述内部逻辑

```scala
import chisel3._

class MyModule extends Module {
  val io = IO(new Bundle {
    val a = Input(UInt(8.W))
    val b = Input(UInt(8.W))
    val y = Output(UInt(8.W))
  })

  io.y := io.a + io.b
}
```

---

## 3. 常用导入

```scala
import chisel3._
import chisel3.util._
```

说明：

- `chisel3._`：基础类型和核心构造
- `chisel3.util._`：常用工具，如 `Mux`、`Cat`、`Fill`、`VecInit`、`Decoupled`、`Queue` 等

---

## 4. 模块定义

### 4.1 定义模块

```scala
class MyModule extends Module {
  val io = IO(new Bundle {
    ...
  })
}
```

说明：

- `Module` 表示硬件模块
- `io` 通常是模块接口
- `IO(...)` 用于声明模块端口

---

## 5. 数据类型

### 5.1 Bool

布尔类型，表示 1 bit 逻辑值

```scala
val a = Bool()
val b = Wire(Bool())
val c = RegInit(false.B)
```

常量：

```scala
true.B
false.B
```

---

### 5.2 UInt

无符号整数

```scala
val a = UInt(8.W)
val b = Wire(UInt(16.W))
val c = RegInit(0.U(8.W))
```

说明：

- `8.W` 表示位宽为 8
- `0.U` 表示无符号常量 0

---

### 5.3 SInt

有符号整数

```scala
val a = SInt(8.W)
val b = RegInit(0.S(8.W))
```

常量：

```scala
1.S
-1.S
```

---

### 5.4 Clock 和 Reset

```scala
val clk = Clock()
val rst = Reset()
```

通常不手动定义，模块默认已有时钟和复位上下文

---

### 5.5 位宽写法

```scala
8.W
16.W
32.W
```

用于指定类型宽度

示例：

```scala
UInt(8.W)
SInt(32.W)
```

---

## 6. 常量写法

### 6.1 UInt 常量

```scala
0.U
1.U
10.U
15.U(8.W)
```

进制写法：

```scala
"b1010".U
"hff".U
"o17".U
```

---

### 6.2 SInt 常量

```scala
0.S
-1.S
7.S(4.W)
```

---

### 6.3 Bool 常量

```scala
true.B
false.B
```

---

## 7. Wire、Reg、RegInit

### 7.1 Wire

组合逻辑信号

```scala
val x = Wire(UInt(8.W))
x := io.a + io.b
```

说明：

- `Wire` 本身不带存储
- 适合中间组合信号

---

### 7.2 Reg

时序寄存器

```scala
val r = Reg(UInt(8.W))
r := io.a
```

说明：

- `Reg` 表示一个寄存器
- 值在时钟边沿更新

---

### 7.3 RegInit

带初始值的寄存器

```scala
val r = RegInit(0.U(8.W))
```

说明：

- 常用于计数器、状态机状态寄存器等

---

### 7.4 RegNext

表示下一个时钟周期的寄存器结果

```scala
val d = RegNext(io.a)
val e = RegNext(io.a, 0.U)
```

---

## 8. IO 与方向

### 8.1 Input / Output

```scala
val io = IO(new Bundle {
  val a = Input(UInt(8.W))
  val b = Input(UInt(8.W))
  val y = Output(UInt(8.W))
})
```

---

### 8.2 Flipped

反转接口方向

```scala
val in = Flipped(Decoupled(UInt(8.W)))
```

适用于主从接口复用

---

## 9. Bundle

`Bundle` 用于组织一组相关信号，类似结构体

```scala
class MyBundle extends Bundle {
  val addr = UInt(32.W)
  val data = UInt(32.W)
  val wen  = Bool()
}
```

使用：

```scala
val io = IO(new Bundle {
  val in  = Input(new MyBundle)
  val out = Output(new MyBundle)
})
```

---

## 10. Vec

`Vec` 表示一组同类型信号

```scala
val v = Wire(Vec(4, UInt(8.W)))
v(0) := 1.U
v(1) := 2.U
```

寄存器数组：

```scala
val regs = Reg(Vec(8, UInt(32.W)))
```

初始化：

```scala
val table = VecInit(Seq(1.U, 2.U, 3.U, 4.U))
```

---

## 11. 连接与赋值

Chisel 中连接使用 `:=`

```scala
io.y := io.a + io.b
```

说明：

- 不是 Scala 变量赋值
- 是硬件连接语义

---

## 12. 运算符

### 12.1 算术运算

```scala
+
-
*
/
%
```

示例：

```scala
io.y := io.a + io.b
```

---

### 12.2 比较运算

```scala
===
=/=
<
<=
>
>=
```

示例：

```scala
when(io.a === io.b) {
  ...
}
```

注意：

- 相等比较是 `===`
- 不等比较是 `=/=`

---

### 12.3 逻辑运算

```scala
&&
||
!
```

示例：

```scala
when(io.valid && io.ready) {
  ...
}
```

---

### 12.4 按位运算

```scala
&
|
^
~
```

示例：

```scala
io.y := io.a & io.b
```

---

### 12.5 移位运算

```scala
<<
>>
```

示例：

```scala
io.y := io.a << 1
```

---

## 13. 条件控制

### 13.1 when / elsewhen / otherwise

```scala
when(cond1) {
  ...
}.elsewhen(cond2) {
  ...
}.otherwise {
  ...
}
```

示例：

```scala
when(io.sel === 0.U) {
  io.y := io.a
}.elsewhen(io.sel === 1.U) {
  io.y := io.b
}.otherwise {
  io.y := 0.U
}
```

说明：

- 类似 if / else if / else
- 用于硬件条件逻辑描述

---

### 13.2 switch / is

```scala
switch(io.sel) {
  is(0.U) { io.y := io.a }
  is(1.U) { io.y := io.b }
  is(2.U) { io.y := io.c }
}
```

适合多路分支

---

## 14. 多路选择

### 14.1 Mux

二选一多路器。

```scala
val y = Mux(cond, a, b)
```

---

### 14.2 MuxCase

```scala
val y = MuxCase(defaultValue, Array(
  cond1 -> value1,
  cond2 -> value2
))
```

---

### 14.3 MuxLookup

```scala
val y = MuxLookup(sel, defaultValue, Array(
  0.U -> a,
  1.U -> b,
  2.U -> c
))
```

---

## 15. 位操作

### 15.1 取位

```scala
val bit0 = io.a(0)
val bit7 = io.a(7)
```

---

### 15.2 取位段

```scala
val low  = io.a(3, 0)
val high = io.a(7, 4)
```

---

### 15.3 拼接 Cat

```scala
val y = Cat(a, b)
```

说明：

- `Cat(a, b)` 把 `a` 放高位，`b` 放低位

---

### 15.4 Fill

```scala
val y = Fill(4, io.a(0))
```

说明：

- 将某一位重复多次

---

### 15.5 位宽转换

```scala
val x = io.a.asUInt
val y = io.a.asSInt
val z = io.a.asBool
```

---

## 16. 常见辅助函数

### 16.1 log2Ceil

```scala
val width = log2Ceil(16)
```

说明：

- 返回表示某个范围所需的最小位宽

---

### 16.2 PopCount

```scala
val cnt = PopCount(io.a)
```

说明：

- 统计 1 的个数

---

### 16.3 PriorityEncoder

```scala
val idx = PriorityEncoder(io.in)
```

---

### 16.4 OHToUInt / UIntToOH

```scala
val oh  = UIntToOH(io.sel)
val idx = OHToUInt(io.oh)
```

---

## 17. 寄存器与时序逻辑

### 17.1 简单寄存器

```scala
val r = RegInit(0.U(8.W))
r := io.in
```

### 17.2 带使能寄存器

```scala
when(io.en) {
  r := io.in
}
```

### 17.3 计数器示例

```scala
val cnt = RegInit(0.U(8.W))
cnt := cnt + 1.U
```

---

## 18. Counter

`Counter` 是常用工具。

```scala
val (cnt, wrap) = Counter(true.B, 16)
```

说明：

- `cnt`：计数值
- `wrap`：计满回绕时为真

带使能：

```scala
val (cnt, wrap) = Counter(io.en, 16)
```

---

## 19. 状态机 FSM

常见写法是：

- 定义状态常量
- 定义状态寄存器
- 用 `switch` / `is` 转移

示例：

```scala
val sIdle :: sBusy :: sDone :: Nil = Enum(3)
val state = RegInit(sIdle)

switch(state) {
  is(sIdle) {
    when(io.start) {
      state := sBusy
    }
  }
  is(sBusy) {
    when(io.finish) {
      state := sDone
    }
  }
  is(sDone) {
    state := sIdle
  }
}
```

---

## 20. Enum

```scala
val s0 :: s1 :: s2 :: Nil = Enum(3)
```

说明：

- 用于定义状态机状态
- 本质上生成若干编码值

---

## 21. 函数定义

可以在模块内部定义 Scala 函数辅助生成逻辑

```scala
def add2(x: UInt, y: UInt): UInt = {
  x + y
}
```

使用：

```scala
io.out := add2(io.a, io.b)
```

---

## 22. for 循环

Chisel 中常用 Scala 的 `for` 生成重复结构

```scala
for (i <- 0 until 4) {
  v(i) := i.U
}
```

也常用于批量连接：

```scala
for (i <- 0 until 8) {
  regs(i) := 0.U
}
```

说明：

- 这里是“生成硬件结构”，不是运行时循环

---

## 23. Scala 集合在 Chisel 中的常见用法

### 23.1 Seq

```scala
val xs = Seq(1.U, 2.U, 3.U)
```

### 23.2 map

```scala
val ys = (0 until 4).map(i => i.U(8.W))
val vec = VecInit(ys)
```

### 23.3 tabulate

```scala
val vec = VecInit.tabulate(4)(i => (i * 2).U(8.W))
```

---

## 24. 存储器 Mem 和 SyncReadMem

### 24.1 Mem

异步读、同步写风格的存储结构描述

```scala
val mem = Mem(16, UInt(8.W))
```

读写：

```scala
val rdata = mem(io.addr)
when(io.wen) {
  mem(io.addr) := io.wdata
}
```

---

### 24.2 SyncReadMem

同步读存储器

```scala
val mem = SyncReadMem(16, UInt(8.W))
val rdata = mem.read(io.addr, io.ren)
when(io.wen) {
  mem.write(io.addr, io.wdata)
}
```

说明：

- 更接近真实 SRAM 行为
- 读结果通常延后一拍观察

---

## 25. DontCare

```scala
io.out := DontCare
```

说明：

- 用于明确表示某些信号暂不关心
- 使用时要小心，不要掩盖逻辑错误

---

## 26. printf

用于仿真时打印调试信息。

```scala
printf(p"cnt = ${cnt}\n")
```

带条件打印：

```scala
when(io.valid) {
  printf(p"data = ${io.data}\n")
}
```

---

## 27. assert

用于断言

```scala
assert(io.a <= io.b)
```

说明：

- 主要用于仿真/验证阶段检查条件

---

## 28. stop

用于终止仿真

```scala
when(io.done) {
  stop()
}
```

---

## 29. 常见接口模式

### 29.1 Valid

```scala
class MyValidBundle extends Bundle {
  val valid = Output(Bool())
  val bits  = Output(UInt(8.W))
}
```

---

### 29.2 Decoupled

```scala
val in  = Flipped(Decoupled(UInt(8.W)))
val out = Decoupled(UInt(8.W))
```

字段：

- `valid`
- `ready`
- `bits`

握手条件：

```scala
when(in.valid && out.ready) {
  ...
}
```

---

## 30. Queue

`Queue` 是 `chisel3.util` 中常用的 FIFO 工具

```scala
val q = Module(new Queue(UInt(8.W), 4))
q.io.enq <> in
q.io.deq <> out
```

---

## 31. 连接符号

### 31.1 :=

普通连接

```scala
io.out := value
```

### 31.2 <>

双向批量连接

```scala
io.in <> other.io.out
```

说明：

- 常用于 Bundle / Decoupled 接口连接

---

## 32. 常见类型转换

```scala
a.asUInt
a.asSInt
a.asBool
a.asTypeOf(new MyBundle)
```

示例：

```scala
val x = "b1010".U
val y = x.asBools
```

---

## 33. 常见易混点

### 33.1 `=` 和 `:=` 的区别

- `=`：Scala 变量绑定
- `:=`：Chisel 硬件连接

### 33.2 `==` 和 `===` 的区别

- `==`：Scala 层比较
- `===`：硬件信号比较

### 33.3 `if` 和 `when` 的区别

- `if`：Scala 编译期控制
- `when`：硬件条件逻辑

### 33.4 `for` 循环不是运行时循环

- 它是生成重复硬件结构

### 33.5 `Wire` 不是寄存器

- `Wire`：组合逻辑
- `Reg`：时序状态

### 33.6 `UInt` 默认无符号

- 负数请用 `SInt`

---

## 34. 常见代码模板

### 34.1 组合逻辑模板

```scala
val result = Wire(UInt(8.W))
result := 0.U

when(io.sel) {
  result := io.a + io.b
}

io.out := result
```

---

### 34.2 寄存器模板

```scala
val reg = RegInit(0.U(8.W))

when(io.en) {
  reg := io.in
}

io.out := reg
```

---

### 34.3 状态机模板

```scala
val sIdle :: sRun :: sDone :: Nil = Enum(3)
val state = RegInit(sIdle)

switch(state) {
  is(sIdle) {
    when(io.start) {
      state := sRun
    }
  }
  is(sRun) {
    when(io.finish) {
      state := sDone
    }
  }
  is(sDone) {
    state := sIdle
  }
}
```

---

## 35. 常见命名建议

适合模块内部：

- `in`, `out`
- `addr`, `data`, `wen`, `ren`
- `state`, `nextState`
- `cnt`
- `valid`, `ready`, `bits`

适合中间信号：

- `sum`
- `selResult`
- `readData`
- `writeEnable`

---

## 36. 后续可继续补充的主题

后面可以继续往这个总 md 里追加：

- Tester / ChiselTest
- 参数化设计
- 多模块层级连接
- Ready/Valid 深入
- FIRRTL / CIRCT 基础
- BlackBox
- 多时钟域
- Rocket Chip / Diplomacy 相关概念

---

## 37. 个人补充区

### 37.1 我常忘的语法

### 37.2 常见报错记录

### 37.3 常用模板片段

