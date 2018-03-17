using System;

namespace OverridingSample
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            C c = new C();
            Console.WriteLine(c.x);
            Console.WriteLine(((B)c).x);
            Console.WriteLine(((A)((B)c)).x);
            c.M1();
            ((B)c).M1();
            ((A)((B)c)).M1();
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
}
