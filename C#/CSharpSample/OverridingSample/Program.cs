using System;

namespace OverridingSample
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            //C c = new C();
            //Console.WriteLine(c.x);
            //Console.WriteLine(((B)c).x);
            //Console.WriteLine(((A)((B)c)).x);
            //c.M1();
            //((B)c).M1();
            //((A)((B)c)).M1();

            Parent p = new Parent();
            p.Test();

            Child c = new Child();
            c.Test();

            Parent pc = new Child();
            pc.Test();

            //parent, child, parent

            p.Test1();
            c.Test1();
            pc.Test1();

            //parent1, child1, child1
        }
    }

    class A
    {
        public int x = 777;

        public virtual void M1()
        {
            Console.WriteLine("A");
        }
    }

    class B : A
    {
        public int x = 888;
        public override void M1()
		{
			Console.WriteLine("B");
		}
    }

    class C: B
    {
        public int x = 999;
		public override void M1()
		{
			Console.WriteLine("C");
		}
    }

    class Parent
    {
        public Parent()
        {
            Console.WriteLine("Default Constructor");
        }

        static Parent()
        {
            Console.WriteLine("Static Constructor");
        }

        public void Test()
        {
            Console.WriteLine("parent");
        }

        public virtual void Test1()
        {
            Console.WriteLine("parent1");
        }
    }

    class Child : Parent
	{
		public new void Test()
		{
			Console.WriteLine("Child");
		}

        public override void Test1()
		{
			Console.WriteLine("child1");
		}
	}
}
