import { Membership, MembershipAttributes } from '@siqr/models';
import { status } from 'server/reply';
import { Context } from 'server/typings/common';

export const getMemberships = async (ctx: Context) => {
  ctx.log.info('Starting getMemberships');
  const memberships = await Membership.findAll();

  ctx.log.info('Finishing getMemberships');
  return status(200).json(memberships);
};

export const getMembershipById = async (ctx: Context) => {
  const membershipId = ctx.params.id;
  const membership = await Membership.findByPk(membershipId);
  if (!membership)
    return status(404).json({
      message: `Membership with id ${membershipId} doesn't exist.`,
    });
  return status(200).json(membership);
};

export const createMembership = async (ctx: Context) => {
  ctx.log.info('Starting createMemberships');
  const payload: MembershipAttributes = ctx.req.body;
  try {
    const membership = await Membership.create(payload);
    ctx.log.info('Finishing createMemberships');
    return status(200).json(membership);
  } catch ({ errors }) {
    ctx.log.error('Finishing createMemberships with error');
    return status(400).json(errors.map((error: any) => error.message));
  }
};

export const updateMembership = async (ctx: Context) => {
  ctx.log.info('Starting updateMemberships');
  const payload: MembershipAttributes = ctx.req.body;
  try {
    ctx.log.info('Finding membership with id: %d.', ctx.params.id);
    const membership = await Membership.findByPk(ctx.params.id);
    if (!membership) {
      ctx.log.error("Membership with id %d doesn't exist.", ctx.params.id);
      return status(404).json({
        message: `Membership with id ${ctx.params.id} doesn't exist.`,
      });
    }

    ctx.log.info('Updating membership');
    await Membership.update(payload, {
      fields: ['name', 'price', 'duration', 'durationTimeUnit'],
      where: { id: ctx.params.id },
    });

    ctx.log.info('Finishing updateMemberships');
    return status(204);
  } catch (error) {
    ctx.log.error('Finishing updateMemberships with error');
    return status(409).json(error);
  }
};

export const deleteMembership = async (ctx: Context) => {
  ctx.log.info('Starting deleteMemberships');
  try {
    ctx.log.info('Finding membership with id: %d', ctx.params.id);
    const membership = await Membership.findByPk(ctx.params.id);

    if (!membership) {
      ctx.log.error("Membership with id %d doesn't exist.", ctx.params.id);
      return status(404).json({
        message: `Membership with id ${ctx.params.id} doesn't exist.`,
      });
    }

    ctx.log.info('Deleting membership');
    await Membership.destroy({ where: { id: ctx.params.id } });

    ctx.log.info('Finishing deleteMemberships');
    return status(204);
  } catch (error) {
    ctx.log.info('Finishing deleteMemberships with error');
    return status(409).json(error);
  }
};
