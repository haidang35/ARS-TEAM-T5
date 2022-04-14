using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    public class NotificationsController : ApiController
    {
        private MyDbContext db = new MyDbContext();

        // GET: api/Notifications
        [Route("~/api/notifications")]
        [HttpGet]
        [ResponseType(typeof(Notification))]
        public IHttpActionResult GetNotifications()
        {
            return Ok(db.Notifications.ToList());
        }

        // GET: api/Notifications/5
        [Route("~/api/notifications/{id:int}")]
        [HttpGet]
        [ResponseType(typeof(Notification))]
        public IHttpActionResult GetNotification(string id)
        {
            Notification notification = db.Notifications.Find(id);
            if (notification == null)
            {
                return NotFound();
            }

            return Ok(notification);
        }

        // PUT: api/Notifications/5
        [Route("~/api/notifications/{id:int}")]
        [HttpPut]
        [ResponseType(typeof(Notification))]
        public IHttpActionResult PutNotification(string id, Notification notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notification.Title)
            {
                return BadRequest();
            }

            db.Entry(notification).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotificationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(notification);
        }

        // POST: api/Notifications
        [Route("~/api/notifications")]
        [HttpPost]
        [ResponseType(typeof(Notification))]
        public IHttpActionResult PostNotification(Notification notification)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Notifications.Add(notification);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NotificationExists(notification.Title))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Ok(notification);
        }

        // DELETE: api/Notifications/5
        [Route("~/api/notifications/{id:int}")]
        [HttpDelete]
        [ResponseType(typeof(Notification))]
        public IHttpActionResult DeleteNotification(string id)
        {
            Notification notification = db.Notifications.Find(id);
            if (notification == null)
            {
                return NotFound();
            }

            db.Notifications.Remove(notification);
            db.SaveChanges();

            return Ok(notification);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotificationExists(string id)
        {
            return db.Notifications.Count(e => e.Title == id) > 0;
        }
    }
}