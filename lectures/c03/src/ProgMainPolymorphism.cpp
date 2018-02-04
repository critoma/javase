#include <iostream>
#include <typeinfo>
#include <string>
using namespace std;

class Vehicul {
private:
	int tipMotor;
public:
	Vehicul() {
		cout<<"\nConstructor default - Vehicul"<<endl;
		this->tipMotor = 0;
	}
	Vehicul(int tm) {
		cout<<"\nConstructor cu 1 parametru - Vehicul"<<endl;
		this->tipMotor = tm;
	}
	int getTipMotor() {
		cout<<"\n Tip Motor="<<this->tipMotor<<endl;
		return this->tipMotor;
	}
	virtual void f() {
		cout<<"\n f() din Vehicul"<<endl;
	}
	virtual void g() {
		cout<<"\n g() din Vehicul"<<endl;
	}
};

class Masina : public Vehicul {
private:
	int nrRoti;
public:
	Masina() {
		cout<<"\nConstructor default Masina"<<endl;
		this->nrRoti = 0;
	}
	Masina(int nRoti) {
		cout<<"\nConstructor cu 1 parametru Masina"<<endl;
		this->nrRoti = nRoti;
	}
	Masina(int nRoti, int tipMotor):Vehicul(tipMotor) {
		cout<<"\nConstructor cu 2 parametrii Masina"<<endl;
		this->nrRoti = nRoti;
		//this->tipMotor = tipMotor;
	}
	int getNrRoti() {
		cout<<"\n Nr roti="<<this->nrRoti<<endl;
		return this->nrRoti;
	}
	virtual void f() {
		cout<<"\nf() din Masina"<<endl;
	}
};

class Avion : public Vehicul {
private:
	int capacitate;
	int nrMotoare;
public:
	Avion(int cap = 0, int nrMot = 0, int tipMot = 0):Vehicul(tipMot) {
		cout<<"\nConstructor si default si cu 3 parametrii Avion"<<endl;
		this->capacitate = cap;
		this->nrMotoare = nrMot;
	}
	int getCapacitate() {
		cout<<"\n Capacitate="<<this->capacitate<<endl;
		return this->capacitate;
	}
	int getNrMotoare() {
		cout<<"\n Nr motoare="<<this->nrMotoare<<endl;
		return this->nrMotoare;
	}
	virtual void f() {
		cout<<"\nf() din Avion"<<endl;
	}
	virtual void g() {
		cout<<"\n g() din Avion"<<endl;
	}
};

void main() {
	Vehicul* pobv = NULL;
	Vehicul obv(1);

	Masina m(4, 100);
	Masina* pm = new Masina(4,170);

	Avion a(350, 4, 500);
	Avion* pa = NULL;
	pa = new Avion(380, 6, 530);

	obv = m;//cast implicit pt obv = m, in schimb trebuie cast explicit pt m = (Masina)obv;
	obv.f();//acesta nu este POLIMORFISM
	obv = a;
	obv.f();

	pobv = &m;
	pobv->f();//ACESTA ESTE POLIMORFISM
	pobv = &a;
	pobv->f();

	//pm = &m;
	//pa = &a;

	int k1 = 7, k2 = 0, k3 = 0;
	try {
		if (k2 == 0) throw "Nashpa rau, numitorul a fost 0.";
		k3 = k1 / k2;		
	} catch(char* exc) {
		cout<<"Am avut exceptia="<<exc<<endl;
	}

	cout<<"Am trecut de exceptie"<<endl;

	try {
		pobv = pm;
		pa = (Avion*)pobv;

		////pobv = pa;
		////pm = (Masina*)pobv;
		
		//live hand-out sample-decomment the statements with //
		cout<<"type pa="<<typeid(*pa).name()<<endl;
		if (strcmp(typeid(*pa).name(), "class Masina") == 0) 
			throw "CastClassException Masina->Vehicul->Masina si nu altceva";

		////cout<<"type pm="<<typeid(*pm).name()<<endl;
		////if (strcmp(typeid(*pm).name(), "class Avion") == 0) 
		////	throw "CastClassException Avion->Vehicul->Avion si nu altceva";
		
		pa->getCapacitate();	//in Java is ClassCastException
								//in C++ is non-sense
		pa->getNrMotoare();
		pa->getTipMotor();

		////pm->getNrRoti();
		////pm->getTipMotor();
	} catch(char* excStr1) {
		cout<<"Exception 2: "<<excStr1<<endl;
	}
	
}