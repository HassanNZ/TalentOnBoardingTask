using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ReactAspNet;

namespace ReactAspNet.Controllers
{
    public class CustomersController : Controller
    {
        private TalentEntities db = new TalentEntities();

        // GET: Customers
        public ActionResult Index()
        {
            return View(db.Customers.ToList());
        }
        public JsonResult getCustomers()
        {
            var customer = db.Customers.Select(x => x).ToList();

            return Json(customer, JsonRequestBehavior.AllowGet);
        }
        // GET: Customers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }
        public JsonResult getCustomerInfo(int? id)
        {
            if (id == null)
            {
                return Json(" bad request !!!!", JsonRequestBehavior.AllowGet);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return Json("There is no customer by this Id", JsonRequestBehavior.AllowGet);
            }
            return Json(customer,JsonRequestBehavior.AllowGet);
        }

        // GET: Customers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Customers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Customers.Add(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(customer);
        }
       
       
       
        public ActionResult Createtest([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            //if (customer.Name == "I got It") { 
            db.Customers.Add(customer);
            db.SaveChanges();
            //    return Json("added11111", JsonRequestBehavior.AllowGet);
            //}

            return RedirectToAction("Index");
        }
        // GET: Customers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Name,Address")] Customer customer)
        {
            if (ModelState.IsValid)
            {
                db.Entry(customer).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(customer);
        }

        // GET: Customers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Customer customer = db.Customers.Find(id);
            if (customer == null)
            {
                return HttpNotFound();
            }
            return View(customer);
        }

        // POST: Customers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Customer customer = db.Customers.Find(id);
            db.Customers.Remove(customer);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        
        public ActionResult Deletetest(int? id)
        {
            if (id != null) {
                Customer customer = db.Customers.Find(id);
                db.Customers.Remove(customer);
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
